import { stat } from "node:fs/promises"
import * as path from "node:path"
import { emptyTail, foldTail, type Tail } from "../tail-fold/tail-fold.module.code.ts"
import {
  type Entry,
  type EntryFold,
  emptyEntryFold,
  emptyJournal,
  type FoldJournal,
  foldEntryLine,
  undoFold,
} from "../transcript-model/transcript-model.module.code.ts"
import {
  readSubagentsIn,
  type SubagentTranscript,
} from "../transcript-sources/transcript-sources.module.code.ts"

export interface TranscriptRead {
  readonly entries: readonly Entry[]
  readonly subagents: ReadonlyMap<string, SubagentTranscript>
  readonly subagentEntries: ReadonlyMap<string, readonly Entry[]>
  readonly bytesFolded: number
  readonly bytesThere: number
  readonly filesFolded: number
  readonly filesRefolded: number
}

export interface TranscriptReader {
  readonly read: (transcriptPath: string) => Promise<TranscriptRead>
}

interface Held {
  readonly tail: Tail
  readonly fold: EntryFold
  uncommitted: FoldJournal | null
  partial: string
}

interface Roll {
  readonly directory: string
  readonly mtimeMs: number
  readonly subagents: ReadonlyMap<string, SubagentTranscript>
}

export function createTranscriptReader(): TranscriptReader {
  const held = new Map<string, Held>()
  let roll: Roll | null = null

  const holdFor = (filePath: string): Held => {
    const existing = held.get(filePath)
    if (existing !== undefined) {
      return existing
    }
    const fresh: Held = {
      tail: emptyTail(),
      fold: emptyEntryFold(),
      uncommitted: null,
      partial: "",
    }
    held.set(filePath, fresh)
    return fresh
  }

  const foldFile = async (
    filePath: string
  ): Promise<{ folded: number; bytesThere: number; refolded: boolean }> => {
    const one = holdFor(filePath)
    if (one.uncommitted !== null) {
      undoFold(one.fold, one.uncommitted)
      one.uncommitted = null
      one.partial = ""
    }
    const outcome = await foldTail(one.tail, filePath, {
      line: (line) => foldEntryLine(one.fold, line),
      reset: () => {
        one.fold.entries.length = 0
        one.fold.results.clear()
        one.fold.toolAt.clear()
        return undefined
      },
    })
    if (outcome.missing) {
      return { folded: 0, bytesThere: 0, refolded: false }
    }
    if (outcome.partial !== "") {
      const journal = emptyJournal()
      foldEntryLine(one.fold, outcome.partial, journal)
      one.uncommitted = journal
      one.partial = outcome.partial
    }
    return { folded: outcome.folded, bytesThere: outcome.bytesThere, refolded: outcome.refolded }
  }

  const entriesOf = (filePath: string): readonly Entry[] => held.get(filePath)?.fold.entries ?? []

  const subagentRoll = async (
    transcriptPath: string
  ): Promise<ReadonlyMap<string, SubagentTranscript>> => {
    const directory = path.join(transcriptPath.replace(/\.jsonl$/, ""), "subagents")
    let mtimeMs: number
    try {
      mtimeMs = (await stat(directory)).mtimeMs
    } catch {
      roll = null
      return new Map<string, SubagentTranscript>()
    }
    if (roll !== null && roll.directory === directory && roll.mtimeMs === mtimeMs) {
      return roll.subagents
    }
    const subagents = await readSubagentsIn(directory)
    roll = { directory, mtimeMs, subagents }
    return subagents
  }

  return {
    read: async (transcriptPath: string): Promise<TranscriptRead> => {
      let bytesFolded = 0
      let bytesThere = 0
      let filesFolded = 0
      let filesRefolded = 0

      const account = (one: {
        folded: number
        bytesThere: number
        refolded: boolean
      }): undefined => {
        bytesFolded += one.folded
        bytesThere += one.bytesThere
        if (one.folded > 0) {
          filesFolded += 1
        }
        if (one.refolded) {
          filesRefolded += 1
        }
        return undefined
      }

      account(await foldFile(transcriptPath))

      const subagents = await subagentRoll(transcriptPath)
      const wanted = new Set<string>([transcriptPath])
      const subagentEntries = new Map<string, readonly Entry[]>()
      for (const [toolUseId, subagent] of subagents) {
        wanted.add(subagent.filePath)
        account(await foldFile(subagent.filePath))
        subagentEntries.set(toolUseId, entriesOf(subagent.filePath))
      }

      for (const filePath of [...held.keys()]) {
        if (!wanted.has(filePath)) {
          held.delete(filePath)
        }
      }

      return {
        entries: entriesOf(transcriptPath),
        subagents,
        subagentEntries,
        bytesFolded,
        bytesThere,
        filesFolded,
        filesRefolded,
      }
    },
  }
}
