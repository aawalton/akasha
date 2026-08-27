import { spawn } from "node:child_process"
import { mkdtempSync, rmSync, writeFileSync } from "node:fs"
import { tmpdir } from "node:os"
import { join } from "node:path"
import { OperationalError } from "@shared/errors-core/exit"
import { expandTilde } from "@shared/utils-fs/expand-tilde"
import {
  remoteRunScriptCommand,
  remoteScriptPath,
  rsyncSshTransport,
  sshConnectionOptions,
} from "./ssh-delivery"

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
}

export interface SshResult {
  readonly stdout: string
  readonly code: number
}

function rsyncFileToHost(target: SshTarget, localFile: string, remotePath: string): Promise<void> {
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
      { stdio: "inherit" }
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
    const child = spawn("ssh", [...sshArgs(target), remoteCommand], {
      stdio: ["ignore", "pipe", "inherit"],
    })
    let stdout = ""
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
  const dir = mkdtempSync(join(tmpdir(), "mobile-cut-"))
  const localFile = join(dir, "deploy.sh")
  const remotePath = remoteScriptPath(`${process.pid}-${Date.now()}`)
  try {
    writeFileSync(localFile, script, { mode: 0o600 })
    await rsyncFileToHost(target, localFile, remotePath)
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
      { stdio: "inherit" }
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
