import type { Answer, Edit } from "./change-answer.module.types.ts"

export function refusing(why: string): Answer {
  return { edits: [], refused: why }
}

export function answered(edits: readonly Edit[]): Answer {
  return { edits, refused: null }
}

export function writing(path: string, was: string | null, body: string): Edit {
  return { path, was, body }
}

export function taking(path: string, was: string): Edit {
  return { path, was, body: null }
}

export function moving(from: string, to: string, was: string, body: string): Edit {
  return { path: to, was, body, from }
}

export function gathered(answers: readonly Answer[]): Answer {
  const held = new Map<string, Edit>()
  for (const one of answers) {
    if (one.refused !== null) return one
    for (const edit of one.edits) {
      const had = held.get(edit.path)
      if (had !== undefined && had.body !== edit.was) {
        return refusing(`\`${edit.path}\` is answered twice, the second from a body the first left`)
      }
      held.set(edit.path, had === undefined ? edit : { ...edit, was: had.was })
    }
  }
  return { edits: [...held.values()], refused: null }
}
