import { mkdirSync, readFileSync, rmSync, statSync } from "node:fs"
import { dirname, join } from "node:path"
import { generatedWhole } from "akasha/change/generator/modules/change-generating/change-generating.module.code.ts"
import type { FileChange } from "akasha/change/modules/answer/change-answer.module.code.ts"
import { heldOver } from "akasha/code/body/modules/body-loading/body-loading.module.code.ts"
import { saidBy } from "akasha/code/type/narrowing/modules/said-by/said-by.module.code.ts"
import { writeFileAtomicSync } from "akasha/file/disk/modules/atomic-write/atomic-write.module.code.ts"
import type { Change } from "akasha/page/modules/change/change.module.code.ts"
import { shadowOnto } from "akasha/page/modules/shadow/shadow.module.code.ts"
import {
  type Generating,
  type Reaching,
  typedOver,
} from "akasha/page/type/modules/type-generating/type-generating.module.code.ts"

const GENERATES = "generateTypes"

const ANSWERS_NONE = `answers to no \`${GENERATES}\``

const BYTES = new TextEncoder()

export type Turned = {
  readonly weighed: number
  readonly added: readonly string[]
  readonly changed: readonly string[]
  readonly refused: readonly string[]
}

type Noting = {
  readonly weighed: Set<string>
  readonly troubled: string[]
}

function bytesAt(root: string, path: string): Uint8Array | null {
  const at = join(root, path)
  const found = statSync(at, { throwIfNoEntry: false })
  return found?.isFile() === true ? readFileSync(at) : null
}

function movingNothing(root: string): Change {
  const disk = (path: string): Uint8Array | null => bytesAt(root, path)
  return { root, changed: [], before: disk, after: disk }
}

function movedBy(root: string, made: readonly FileChange[]): Change {
  const held = new Map<string, Uint8Array | null>()
  for (const one of made) {
    if (one.kind === "add") held.set(one.path, BYTES.encode(one.content))
    else if (one.kind === "replace") held.set(one.path, BYTES.encode(one.contentTo))
    else if (one.kind === "remove") held.set(one.path, null)
  }
  const disk = (path: string): Uint8Array | null => bytesAt(root, path)
  return {
    root,
    changed: [...held.keys()].sort(),
    before: disk,
    after: (path) => (held.has(path) ? (held.get(path) ?? null) : disk(path)),
  }
}

function reachingInto(noting: Noting): Reaching {
  return (asked, at, body) => {
    let held: Record<string, unknown>
    try {
      held = heldOver(asked, at, body)
    } catch (thrown) {
      noting.troubled.push(`\`${at}\` gave no generator — ${saidBy(thrown)}`)
      return { missing: saidBy(thrown) }
    }
    const named = held[GENERATES]
    if (typeof named !== "function") {
      noting.troubled.push(`\`${at}\` ${ANSWERS_NONE}`)
      return { missing: `it ${ANSWERS_NONE}` }
    }
    const generating: Generating = (over, shadow, moving) => {
      try {
        const made = (named as Generating)(over, shadow, moving)
        for (const one of made) noting.weighed.add(one.path)
        return made
      } catch (thrown) {
        noting.troubled.push(`\`${at}\` broke — ${saidBy(thrown)}`)
        return []
      }
    }
    return { generating }
  }
}

function written(root: string, path: string, body: string): undefined {
  const at = join(root, path)
  mkdirSync(dirname(at), { recursive: true })
  writeFileAtomicSync(at, body)
}

export function turnedWhole(root: string, put: boolean): Turned {
  const change = movingNothing(root)
  const cast = shadowOnto(null, change)
  if ("refused" in cast) return { weighed: 0, added: [], changed: [], refused: [cast.refused] }
  const noting: Noting = { weighed: new Set(), troubled: [] }
  const typed = typedOver(change, cast.shadow, reachingInto(noting))
  const ran = generatedWhole(change, cast.shadow, (made) => movedBy(root, made))
  const added: string[] = []
  const changed: string[] = []
  for (const one of [...typed.edits, ...ran.edits]) {
    if (one.kind === "add") {
      added.push(one.path)
      if (put) written(root, one.path, one.content)
    } else if (one.kind === "replace") {
      changed.push(one.path)
      if (put) written(root, one.path, one.contentTo)
    } else if (one.kind === "remove") {
      changed.push(one.path)
      if (put) rmSync(join(root, one.path), { force: true })
    }
  }
  return {
    weighed: noting.weighed.size + ran.weighed,
    added: added.sort(),
    changed: changed.sort(),
    refused: [...noting.troubled, ...ran.refused],
  }
}
