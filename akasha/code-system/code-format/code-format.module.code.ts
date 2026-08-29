import { join } from "node:path"

const BIOME_AT = "node_modules/.bin/biome"

const CHECKS = "check"

const REWRITES = "--write"

const OVER = "--stdin-file-path="

export type Formatted = {
  readonly body: Uint8Array
  readonly changed: boolean
}

export function formattedBody(root: string, path: string, body: Uint8Array): Formatted {
  const held: Formatted = { body, changed: false }
  try {
    const done = Bun.spawnSync([join(root, BIOME_AT), CHECKS, REWRITES, `${OVER}${path}`], {
      cwd: root,
      stdin: body,
      stdout: "pipe",
      stderr: "pipe",
    })
    if (done.exitCode !== 0) return held
    const said = done.stdout
    if (said.byteLength === 0 || said.equals(body)) return held
    return { body: new Uint8Array(said), changed: true }
  } catch {
    return held
  }
}
