import { createHash } from "node:crypto"
import { join } from "node:path"
import { z } from "zod"
import {
  type CommitSha40,
  type InputsHash12,
  inputsHash12,
} from "../ci-identifiers/ci-identifiers.module.code.ts"

const ARRAY_BUFFER_SCHEMA = z.instanceof(ArrayBuffer)

export type BlobMissingError = Error & {
  readonly __brand: "BlobMissingError"
  readonly sha: string
  readonly path: string
}

export function makeBlobMissingError(args: { sha: string; path: string }): BlobMissingError {
  return Object.assign(
    new Error(
      `git cat-file: ${args.sha}:${args.path} is missing — tree listed it but blob is absent`
    ),
    {
      __brand: "BlobMissingError" as const,
      sha: args.sha,
      path: args.path,
    }
  )
}

export function isBlobMissingError(err: unknown): err is BlobMissingError {
  return err instanceof Error && "__brand" in err && err.__brand === "BlobMissingError"
}

export type DegradedInputsGraphError = Error & {
  readonly __brand: "DegradedInputsGraphError"
  readonly sha: string
}

export function makeDegradedInputsGraphError(args: { sha: string }): DegradedInputsGraphError {
  return Object.assign(
    new Error(
      `inputsHash: empty graphFileSet at ${args.sha} — the workflow graph is degraded (no files resolved); refusing the per-commit SHA fallback that would silently roll inputsHash-keyed namespaces`
    ),
    {
      __brand: "DegradedInputsGraphError" as const,
      sha: args.sha,
    }
  )
}

export function isDegradedInputsGraphError(err: unknown): err is DegradedInputsGraphError {
  return err instanceof Error && "__brand" in err && err.__brand === "DegradedInputsGraphError"
}

export function hashFiles(
  entries: ReadonlyArray<{ path: string; bytes: Uint8Array }>
): InputsHash12 {
  const sorted = [...entries].sort((a, b) => (a.path < b.path ? -1 : a.path > b.path ? 1 : 0))
  const hash = createHash("sha256")
  for (const { path, bytes } of sorted) {
    hash.update(path)
    hash.update(bytes)
  }
  return inputsHash12(hash.digest("hex").slice(0, 12))
}

export async function computeInputsHash(args: {
  workspace: string
  graphFileSet: readonly string[]
}): Promise<InputsHash12> {
  const { workspace, graphFileSet } = args
  const entries = await Promise.all(
    graphFileSet.map(async (path) => ({
      path,
      bytes: new Uint8Array(
        ARRAY_BUFFER_SCHEMA.parse(await Bun.file(join(workspace, path)).arrayBuffer())
      ),
    }))
  )
  return hashFiles(entries)
}

export interface RepoFile {
  readonly repo: string
  readonly path: string
}

export async function computeInputsHashAcrossRepos(args: {
  roots: Readonly<Record<string, string>>
  files: readonly RepoFile[]
}): Promise<InputsHash12> {
  const { roots, files } = args
  const entries = await Promise.all(
    files.map(async ({ repo, path }) => {
      const root = roots[repo]
      if (root === undefined) {
        throw new Error(
          `inputsHash: the closure names ${repo}:${path} and nothing gave a root for \`${repo}\`, so that file cannot be read — a hash taken without it would key a cache on inputs it never saw`
        )
      }
      return {
        path: `${repo}:${path}`,
        bytes: new Uint8Array(
          ARRAY_BUFFER_SCHEMA.parse(await Bun.file(join(root, path)).arrayBuffer())
        ),
      }
    })
  )
  return hashFiles(entries)
}

export async function computeInputsHashAtCommit(args: {
  gitDir: string
  sha: CommitSha40
  graphFileSet: readonly string[]
}): Promise<InputsHash12> {
  const { gitDir, sha, graphFileSet } = args

  if (graphFileSet.length === 0) throw makeDegradedInputsGraphError({ sha })
  const matched: readonly string[] = [...graphFileSet].sort()

  const cat = Bun.spawn(["git", "-C", gitDir, "cat-file", "--batch"], {
    stdin: "pipe",
    stdout: "pipe",
    stderr: "pipe",
  })
  try {
    const encoder = new TextEncoder()
    const writeRequests = async () => {
      try {
        for (const path of matched) await cat.stdin.write(encoder.encode(`${sha}:${path}\n`))
      } finally {
        await cat.stdin.end()
      }
    }
    await writeRequests().catch(() => {})

    const [stdoutBuf, catStderr, catExit] = await Promise.all([
      new Response(cat.stdout).arrayBuffer(),
      new Response(cat.stderr).text(),
      cat.exited,
    ])
    if (catExit !== 0) {
      throw new Error(`git cat-file --batch failed (exit ${catExit}): ${catStderr.trim()}`)
    }
    const buf = new Uint8Array(stdoutBuf)

    const decoder = new TextDecoder()
    const entries: Array<{ path: string; bytes: Uint8Array }> = []
    let i = 0
    for (const path of matched) {
      let j = i
      while (j < buf.length && buf[j] !== 0x0a) j++
      const header = decoder.decode(buf.subarray(i, j))
      if (header.endsWith(" missing")) {
        throw makeBlobMissingError({ sha, path })
      }
      const parts = header.split(" ")
      const size = Number.parseInt(parts[2] ?? "", 10)
      if (!Number.isFinite(size)) {
        throw new Error(`git cat-file: malformed header for ${path}: ${JSON.stringify(header)}`)
      }
      i = j + 1
      const bytes = new Uint8Array(buf.subarray(i, i + size))
      entries.push({ path, bytes })
      i += size + 1
    }
    return hashFiles(entries)
  } finally {
    cat.kill("SIGKILL")
    await cat.exited.catch(() => {})
  }
}
