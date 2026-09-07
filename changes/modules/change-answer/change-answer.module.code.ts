import type { Answer, Edit } from "./change-answer.module.types.ts"

export function refusing(why: string): Answer {
  return { edits: [], refused: why }
}

export function missing(key: string): string {
  return `\`${key}\` names what this change is handed, and the arguments hold no \`${key}\``
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

function under(held: ReadonlyMap<string, Edit>, edit: Edit): Edit | undefined {
  return held.get(edit.from ?? edit.path)
}

export function sameEdit(one: Edit, two: Edit): boolean {
  return one.was === two.was && one.body === two.body && one.from === two.from
}

function restated(held: ReadonlyMap<string, Edit>, edit: Edit): boolean {
  const stated = held.get(edit.path)
  return stated !== undefined && sameEdit(stated, edit)
}

export function gathered(answers: readonly Answer[]): Answer {
  const held = new Map<string, Edit>()
  for (const one of answers) {
    if (one.refused !== null) return one
    for (const edit of one.edits) {
      if (restated(held, edit)) continue
      const came = edit.from
      const before = under(held, edit)
      if (before !== undefined && before.body !== edit.was) {
        return refusing(`\`${edit.path}\` is answered twice, the second from a body the first left`)
      }
      if (came !== undefined && came !== edit.path && held.has(edit.path)) {
        return refusing(`\`${edit.path}\` is answered and is also where \`${came}\` lands`)
      }
      if (came !== undefined) held.delete(came)
      const was = before === undefined ? edit.was : before.was
      const from = before?.from ?? came
      held.set(
        edit.path,
        from === undefined
          ? { path: edit.path, was, body: edit.body }
          : { path: edit.path, was, body: edit.body, from }
      )
    }
  }
  return { edits: [...held.values()], refused: null }
}
