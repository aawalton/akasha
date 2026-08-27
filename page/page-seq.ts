import { existsSync, readFileSync } from "node:fs"
import { join } from "node:path"
import { exclusively } from "../exclusive/exclusive.ts"
import { landFiles } from "../repo/land/land.ts"
import { handOffPush } from "../repo/push/push.ts"
import { INSTRUCTIONS } from "../repo/roots/roots.ts"
import { parseFrontmatter, textField } from "./frontmatter.ts"

const NEXT_SEQ_KEY = "next-seq"

const ALLOCATING = ".seq"

export interface SeqSource {
  readonly instructionsRoot: string
  readonly pageTypeRelPath: string
  readonly noun: string
}

export function comparePageSeq(a: number | null | undefined, b: number | null | undefined): number {
  const left = a ?? null
  const right = b ?? null
  if (left === null && right === null) return 0
  if (left === null) return 1
  if (right === null) return -1
  return left - right
}

export function readNextSeqOf(source: SeqSource): number {
  const absolute = join(source.instructionsRoot, source.pageTypeRelPath)
  const stated = textField(parseFrontmatter(readFileSync(absolute, "utf8")), NEXT_SEQ_KEY)
  if (stated === null) {
    throw new Error(
      `${source.pageTypeRelPath} states no \`${NEXT_SEQ_KEY}\`, so there is no seq to take`
    )
  }
  const seq = Number(stated)
  if (!Number.isInteger(seq) || seq <= 0) {
    throw new Error(
      `${source.pageTypeRelPath} states \`${NEXT_SEQ_KEY}: ${stated}\`, ` +
        "which is not a whole number above zero"
    )
  }
  return seq
}

export function statesNextSeq(instructionsRoot: string, pageTypeRelPath: string): boolean {
  const absolute = join(instructionsRoot, pageTypeRelPath)
  if (!existsSync(absolute)) return false
  return textField(parseFrontmatter(readFileSync(absolute, "utf8")), NEXT_SEQ_KEY) !== null
}

function uncommitted(source: SeqSource): boolean {
  const proc = Bun.spawnSync(
    ["git", "-C", source.instructionsRoot, "status", "--porcelain", "--", source.pageTypeRelPath],
    { stdout: "pipe", stderr: "pipe" }
  )
  if ((proc.exitCode ?? 1) !== 0) return false
  return new TextDecoder().decode(proc.stdout ?? new Uint8Array()).trim() !== ""
}

function advanced(standing: string | null, source: SeqSource, seq: number): string {
  if (standing === null) {
    throw new Error(`${source.pageTypeRelPath} is not there, so there is no counter to advance`)
  }
  const stated = `${NEXT_SEQ_KEY}: ${seq}`
  const parts = standing.split(stated)
  if (parts.length !== 2) {
    throw new Error(
      `${source.pageTypeRelPath} states \`${stated}\` ${parts.length - 1} time(s), ` +
        "and advancing the counter needs exactly one"
    )
  }
  return parts.join(`${NEXT_SEQ_KEY}: ${seq + 1}`)
}

export function takeSeqOf(source: SeqSource): number {
  const absolute = join(source.instructionsRoot, source.pageTypeRelPath)
  return exclusively(`${absolute}${ALLOCATING}`, () => {
    const stoodChanged = uncommitted(source)
    const seq = readNextSeqOf(source)
    try {
      landFiles({
        repo: INSTRUCTIONS,
        root: source.instructionsRoot,
        message: `${source.noun}: #${seq} is taken`,
        mechanical: true,
        composing: [
          {
            relPath: source.pageTypeRelPath,
            compose: (standing) => advanced(standing, source, seq),
          },
        ],
      })
      handOffPush(source.instructionsRoot)
      return seq
    } catch (thrown) {
      const said = thrown instanceof Error ? thrown.message : String(thrown)
      if (!stoodChanged && uncommitted(source)) {
        throw new Error(
          `seq ${seq} is spent and nothing was created with it: the edit advancing ` +
            `\`${NEXT_SEQ_KEY}\` in ${source.pageTypeRelPath} reached disk and the commit that ` +
            "should have carried it did not, so that file stands changed and uncommitted. Land or " +
            `undo the change before asking again. What the attempt said:\n${said}`
        )
      }
      throw new Error(
        `no seq was taken: advancing \`${NEXT_SEQ_KEY}\` in ${source.pageTypeRelPath} was refused ` +
          "with the counter left where it stood, and nothing was created. Asking again reads the " +
          `same number and meets the same refusal, so read what it said and fix that:\n${said}`
      )
    }
  })
}
