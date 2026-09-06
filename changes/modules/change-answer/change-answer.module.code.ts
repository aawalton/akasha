import type { Answer, Edit } from "./change-answer.module.types.ts"

export function refusing(why: string): Answer {
  return { edits: [], refused: why }
}

export function answered(edits: readonly Edit[]): Answer {
  return { edits, refused: null }
}

export function movedTo(from: string, to: string, body: string): readonly Edit[] {
  return [
    { path: from, body: null },
    { path: to, body },
  ]
}

export function gathered(answers: readonly Answer[]): Answer {
  const held = new Map<string, string | null>()
  for (const one of answers) {
    if (one.refused !== null) return one
    for (const edit of one.edits) held.set(edit.path, edit.body)
  }
  return {
    edits: [...held].map(([path, body]) => ({ path, body })),
    refused: null,
  }
}
