import { resolve } from "node:path"
import { initiativesDrawn } from "@akasha/editor-extension/work-initiatives"
import { drawnNow } from "@akasha/seat-system/work-tree-drawn"
import { type Drawn, type Node, render, workTree as treeOf, walk } from "@tools/lib/work-tree"
import type {
  Answer,
  Given,
} from "/var/home/walton/repos/akasha/akasha/command-system/calling/calling.module.code.ts"
import { whyOf } from "/var/home/walton/repos/akasha/akasha/command-system/fault-saying/fault-saying.module.code.ts"

export const JSON_OUT = "--json"

export const COUNTS = "--counts"

export const COLORS = "--colors"

const FLAGS = [JSON_OUT, COUNTS, COLORS]

export type Read =
  | { readonly shown: "tree" | "json" | "counts" | "colors" }
  | { readonly refused: readonly string[] }

export function readIn(argv: readonly string[]): Read {
  const refusals: string[] = []
  const named: string[] = []
  for (const one of argv) {
    if (FLAGS.includes(one)) {
      if (!named.includes(one)) named.push(one)
      continue
    }
    refusals.push(`\`${one}\` is no word this takes — it takes \`${FLAGS.join("`, `")}\``)
  }
  if (named.length > 1) {
    refusals.push(`${named.join(", ")} each name what to print, and one call prints one thing`)
  }
  if (refusals.length > 0) return { refused: refusals }
  const one = named[0]
  if (one === JSON_OUT) return { shown: "json" }
  if (one === COUNTS) return { shown: "counts" }
  if (one === COLORS) return { shown: "colors" }
  return { shown: "tree" }
}

export function colorsSaid(repo: string, drawn: Drawn): string {
  return JSON.stringify({ repo, byInitiative: Object.fromEntries(drawn.byInitiative) })
}

export function treeIn(root: string): readonly Node[] {
  return treeOf(
    {
      initiatives: initiativesDrawn(root).map((one) => ({
        slug: one.slug,
        relPath: one.path,
        parent: one.parent,
        persona: one.persona,
      })),
    },
    drawnNow()
  )
}

function said(root: string, read: { shown: string }): Answer {
  if (read.shown === "colors") {
    return { report: [colorsSaid(root, drawnNow())], refusals: [], code: 0 }
  }
  const tree = treeIn(root)
  if (read.shown === "json") {
    return { report: [JSON.stringify({ repo: root, roots: tree })], refusals: [], code: 0 }
  }
  if (read.shown === "counts") {
    return { report: [`initiatives:  ${walk(tree).length}`], refusals: [], code: 0 }
  }
  if (tree.length === 0) {
    return {
      report: [],
      refusals: [`no initiative was read from the index at ${root}`],
      code: 2,
    }
  }
  return { report: [...render(tree)], refusals: [], code: 0 }
}

export function workTree(argv: readonly string[], given: Given): Answer {
  const read = readIn(argv)
  if ("refused" in read) return { report: [], refusals: read.refused, code: 1 }
  try {
    return said(resolve(given.root), read)
  } catch (thrown) {
    return { report: [], refusals: [whyOf(thrown)], code: 3 }
  }
}
