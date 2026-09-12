import { isAbsolute, resolve } from "node:path"
import { buildComposeInput } from "akasha/alan/google/email/compose-input-from-arguments/compose-input-from-arguments.module.code.ts"
import type { ComposeInput } from "akasha/alan/google/email/email-shapes/email-shapes.module.code.ts"
import { told } from "akasha/commands/modules/answering/command-answering.module.code.ts"
import type { Answer, Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import {
  type Filing,
  filledIn,
} from "akasha/commands/modules/filling/command-filling.module.code.ts"
import type { Piping } from "akasha/commands/modules/piping/piping.module.code.ts"
import { inputIn } from "akasha/commands/modules/piping/piping.module.code.ts"
import { namesDrawn } from "akasha/utils/text/name-drawing/name-drawing.module.code.ts"

export const INPUT_MARK = "-"

export const SUBJECT = "--subject"

export const SUBJECT_FILE = "--subject-file"

export const BODY = "--body"

export const BODY_FILE = "--body-file"

export const SUBJECT_FILING: Filing = { said: SUBJECT, file: SUBJECT_FILE, whole: false }

export const BODY_FILING: Filing = { said: BODY, file: BODY_FILE, whole: true }

export function pathAt(root: string, path: string): string {
  return isAbsolute(path) ? path : resolve(root, path)
}

export function asJsonLines(value: unknown): Answer {
  return told(JSON.stringify(value, null, 2).split("\n"))
}

export type Composed = { readonly input: ComposeInput } | { readonly why: readonly string[] }

export type Composing = {
  readonly toAddress: readonly string[]
  readonly cc: readonly string[]
  readonly bcc: readonly string[]
  readonly attach: readonly string[]
  readonly subject?: string
  readonly subjectFile?: string
  readonly body?: string
  readonly bodyFile?: string
  readonly thread?: string
  readonly replyToMessage?: string
  readonly sendAs?: string
}

export function wrongIn(said: Composing): readonly string[] {
  const piped = [
    ...(said.subjectFile === INPUT_MARK ? [SUBJECT_FILE] : []),
    ...(said.bodyFile === INPUT_MARK ? [BODY_FILE] : []),
  ]
  if (piped.length < 2) return []
  return [`${namesDrawn(piped)} each name the input, and one call reads the input once`]
}

export async function composedIn(
  given: Given,
  said: Composing,
  piping: Piping = inputIn
): Promise<Composed> {
  const root = resolve(given.root)
  const wrong = wrongIn(said)
  if (wrong.length > 0) return { why: wrong }
  const subject = filledIn(root, said.subject, said.subjectFile, SUBJECT_FILING, piping)
  if ("refused" in subject) return { why: subject.refused }
  const body = filledIn(root, said.body, said.bodyFile, BODY_FILING, piping)
  if ("refused" in body) return { why: body.refused }
  if (subject.text === undefined || body.text === undefined) {
    return { why: [`a composition names both \`${SUBJECT}\` and \`${BODY}\``] }
  }
  const input = await buildComposeInput({
    to: said.toAddress,
    cc: said.cc,
    bcc: said.bcc,
    subject: subject.text,
    body: body.text,
    thread: said.thread,
    replyToMessage: said.replyToMessage,
    from: said.sendAs,
    attach: said.attach.map((path) => pathAt(root, path)),
  })
  return { input }
}
