import { createHash } from "node:crypto"
import { readFileSync, readdirSync } from "node:fs"
import { join } from "node:path"
import type { Input } from "./mark.ts"

const CHECKS = "checks/check"

const SHAPE = "checks/check-shape.ts"

function oidOf(at: string): string {
  return createHash("sha256").update(readFileSync(at)).digest("hex")
}

export function closureOf(root: string): readonly Input[] {
  const inputs: Input[] = [{ path: SHAPE, oid: oidOf(join(root, SHAPE)) }]
  for (const name of readdirSync(join(root, CHECKS))) {
    if (!name.endsWith(".ts")) continue
    const path = `${CHECKS}/${name}`
    inputs.push({ path, oid: oidOf(join(root, path)) })
  }
  return inputs
}
