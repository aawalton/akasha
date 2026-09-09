#!/usr/bin/env bun

import { existsSync, readFileSync } from "node:fs"
import { resolve } from "node:path"
import type { AddonDataPages } from "../addon-data-pages/addon-data-pages.module.code.ts"
import { ASKED, answered } from "../addon-data-pages/addon-data-pages.module.code.ts"
import { ADDON_DATA_SECTIONS } from "../addon-data-writes/addon-data-writes.module.code.ts"
import { fetchMinedRestorePotions } from "../mined-restore-potions/mined-restore-potions.module.code.ts"

const WHY_MOST = 160

const MESSAGE_MOST = 700

const FRAMES_MOST = 8

const FRAME = "    at "

const POTIONS = "minedRestorePotions"

export type Verdict = "SAME" | "DIFF" | "ABSENT"

export interface Answer {
  readonly section: string
  readonly name: string
  readonly verdict: Verdict
  readonly disk: number
  readonly made: number
}

export interface Proof {
  readonly answers: readonly Answer[]
  readonly threw: readonly string[]
  readonly unread: readonly string[]
}

export function verdictOf(onDisk: string | null, made: string): Verdict {
  if (onDisk === null) return "ABSENT"
  return onDisk === made ? "SAME" : "DIFF"
}

export function firstLineOf(e: unknown, most: number): string {
  return (String(e).split("\n")[0] ?? "").slice(0, most)
}

export function unreadSaidAs(said: string, e: unknown): string {
  return `${said} — ${firstLineOf(e, WHY_MOST)}`
}

export function threwSaidAs(section: string, when: string, e: unknown): string {
  const error = e as Error
  const why = (error?.message ?? String(e)).replace(/\s+/g, " ").slice(0, MESSAGE_MOST)
  const frames = (error?.stack ?? "")
    .split("\n")
    .filter((line) => line.includes(FRAME))
    .slice(0, FRAMES_MOST)
    .map((line) => `      ${line.trim()}`)
  return [`${section} — ${when} ${error?.name}: ${why}`, ...frames].join("\n")
}

export function counted(answers: readonly Answer[], verdict: Verdict): number {
  return answers.filter((one) => one.verdict === verdict).length
}

export function rowOf(answer: Answer): string {
  return (
    `  ${answer.verdict.padEnd(6)} ${answer.name.padEnd(48)}` +
    ` disk=${String(answer.disk).padStart(8)} made=${String(answer.made).padStart(8)}`
  )
}

export function tallyOf(proof: Proof): string {
  return (
    `SAME ${String(counted(proof.answers, "SAME"))}   ` +
    `DIFF ${String(counted(proof.answers, "DIFF"))}   ` +
    `ABSENT ${String(counted(proof.answers, "ABSENT"))}   ` +
    `sections that threw ${String(proof.threw.length)}`
  )
}

export function saidOf(proof: Proof): readonly string[] {
  const said: string[] = []
  let last = ""
  for (const one of proof.answers) {
    if (one.section !== last) {
      said.push(`### ${one.section}`)
      last = one.section
    }
    said.push(rowOf(one))
  }
  said.push(tallyOf(proof))
  for (const one of proof.threw) said.push(`  THREW ${one}`)
  if (proof.unread.length > 0) {
    said.push(`page types the store would not answer (${String(proof.unread.length)}):`)
    for (const one of proof.unread) said.push(`  ${one}`)
  }
  return said
}

async function populations(unread: string[]): Promise<AddonDataPages> {
  const held: Record<string, unknown> = {}
  for (const one of ASKED) {
    try {
      const [accessor, rows] = await answered(one)
      held[accessor] = rows
    } catch (e) {
      unread.push(unreadSaidAs(one.pageTypeSlug, e))
      held[one.accessor] = { rows: [] }
    }
  }
  try {
    held[POTIONS] = await fetchMinedRestorePotions()
  } catch (e) {
    unread.push(unreadSaidAs("mined restore potions", e))
    held[POTIONS] = []
  }
  return held as AddonDataPages
}

export async function proved(only: ReadonlySet<string>): Promise<Proof> {
  const unread: string[] = []
  const pages = await populations(unread)
  const answers: Answer[] = []
  const threw: string[] = []
  for (const [section, build] of ADDON_DATA_SECTIONS) {
    if (only.size > 0 && !only.has(section)) continue
    const compare = async (dir: string, name: string, source: string): Promise<number> => {
      const at = resolve(dir, name)
      const onDisk = existsSync(at) ? readFileSync(at, "utf8") : null
      answers.push({
        section,
        name,
        verdict: verdictOf(onDisk, source),
        disk: onDisk?.length ?? 0,
        made: source.length,
      })
      return source.length
    }
    let built: readonly Promise<number>[] = []
    try {
      built = build(pages, compare)
    } catch (e) {
      threw.push(threwSaidAs(section, "building", e))
      continue
    }
    for (const one of built) {
      try {
        await one
      } catch (e) {
        threw.push(threwSaidAs(section, "writing", e))
      }
    }
  }
  return { answers, threw, unread }
}

export async function proof(argv: readonly string[]): Promise<number> {
  const said = saidOf(await proved(new Set(argv)))
  for (const line of said) process.stdout.write(`${line}\n`)
  return 0
}

if (import.meta.main) process.exitCode = await proof(process.argv.slice(2))
