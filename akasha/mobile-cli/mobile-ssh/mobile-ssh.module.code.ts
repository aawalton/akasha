import { spawn } from "node:child_process"
import { mkdtempSync, rmSync, writeFileSync } from "node:fs"
import { join } from "node:path"
import { OperationalError } from "@akasha/errors-core/exit-code"
import { expandTilde } from "@akasha/utils-fs/expand-tilde"
import {
  MOBILE_SCRATCH_AT,
  remoteRunScriptCommand,
  remoteScriptPath,
  rsyncSshTransport,
  sshConnectionOptions,
} from "../ssh-delivery/ssh-delivery.module.code.ts"

export interface SshTarget {
  readonly user: string
  readonly host: string
  readonly keyPath: string
}

function sshArgs(target: SshTarget): readonly string[] {
  return [
    "-i",
    expandTilde(target.keyPath),
    ...sshConnectionOptions(),
    `${target.user}@${target.host}`,
  ]
}

export interface RunSshOptions {
  readonly stream?: boolean
  readonly quiet?: boolean
}

export interface SshResult {
  readonly stdout: string
  readonly code: number
}

function stdioFor(quiet: boolean | undefined): "inherit" | ["ignore", "ignore", "ignore"] {
  return quiet === true ? ["ignore", "ignore", "ignore"] : "inherit"
}

function rsyncFileToHost(
  target: SshTarget,
  localFile: string,
  remotePath: string,
  quiet?: boolean
): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    const child = spawn(
      "rsync",
      [
        "-a",
        "--chmod=F600",
        "-e",
        rsyncSshTransport(expandTilde(target.keyPath)),
        localFile,
        `${target.user}@${target.host}:${remotePath}`,
      ],
      { stdio: stdioFor(quiet) }
    )
    child.on("error", (err: Error & { code?: string }) => {
      if (err.code === "ENOENT") {
        reject(new OperationalError("rsync not found on PATH"))
        return
      }
      reject(new OperationalError(`rsync spawn failed: ${err.message}`))
    })
    child.on("close", (code) => {
      if (code === 0) {
        resolve()
        return
      }
      reject(
        new OperationalError(`rsync of the deploy script exited ${code} (host: ${target.host})`)
      )
    })
  })
}

function sshExec(
  target: SshTarget,
  remoteCommand: string,
  options: RunSshOptions
): Promise<SshResult> {
  return new Promise<SshResult>((resolve, reject) => {
    const quiet = options.quiet === true
    const child = spawn("ssh", [...sshArgs(target), remoteCommand], {
      stdio: ["ignore", "pipe", quiet ? "pipe" : "inherit"],
    })
    let stdout = ""
    if (quiet && child.stderr) {
      child.stderr.on("data", (chunk: Buffer) => {
        stdout += chunk.toString()
      })
    }
    if (child.stdout) {
      child.stdout.on("data", (chunk: Buffer) => {
        stdout += chunk.toString()
        if (options.stream === true) {
          process.stdout.write(chunk)
        }
      })
    }
    child.on("error", (err: Error & { code?: string }) => {
      if (err.code === "ENOENT") {
        reject(new OperationalError("ssh not found on PATH"))
        return
      }
      reject(new OperationalError(`ssh spawn failed: ${err.message}`))
    })
    child.on("close", (code) => {
      resolve({ stdout, code: code ?? 1 })
    })
  })
}

async function deliverAndRun(
  target: SshTarget,
  script: string,
  options: RunSshOptions
): Promise<SshResult> {
  const dir = mkdtempSync(join(MOBILE_SCRATCH_AT, "mobile-cut-"))
  const localFile = join(dir, "deploy.sh")
  const remotePath = remoteScriptPath(`${process.pid}-${Date.now()}`)
  try {
    writeFileSync(localFile, script, { mode: 0o600 })
    await rsyncFileToHost(target, localFile, remotePath, options.quiet)
    return await sshExec(target, remoteRunScriptCommand(remotePath), options)
  } finally {
    rmSync(dir, { recursive: true, force: true })
  }
}

export function runSshResult(
  target: SshTarget,
  script: string,
  options: RunSshOptions = {}
): Promise<SshResult> {
  return deliverAndRun(target, script, options)
}

export interface RsyncOptions {
  readonly excludes?: readonly string[]
  readonly quiet?: boolean
}

export function rsyncToHost(
  target: SshTarget,
  localDir: string,
  remoteDir: string,
  options: RsyncOptions = {}
): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    const excludeArgs = (options.excludes ?? []).flatMap((pattern) => ["--exclude", pattern])
    const child = spawn(
      "rsync",
      [
        "-az",
        "--delete",
        ...excludeArgs,
        "-e",
        rsyncSshTransport(expandTilde(target.keyPath)),
        `${localDir}/`,
        `${target.user}@${target.host}:${remoteDir}/`,
      ],
      { stdio: stdioFor(options.quiet) }
    )
    child.on("error", (err: Error & { code?: string }) => {
      if (err.code === "ENOENT") {
        reject(new OperationalError("rsync not found on PATH"))
        return
      }
      reject(new OperationalError(`rsync spawn failed: ${err.message}`))
    })
    child.on("close", (code) => {
      if (code === 0) {
        resolve()
        return
      }
      reject(new OperationalError(`rsync exited ${code} (host: ${target.user}@${target.host})`))
    })
  })
}

export async function runSshCapture(
  target: SshTarget,
  script: string,
  options: RunSshOptions = {}
): Promise<string> {
  const { stdout, code } = await deliverAndRun(target, script, options)
  if (code === 0) return stdout
  throw new OperationalError(`ssh exited ${code} (host: ${target.user}@${target.host})`)
}
