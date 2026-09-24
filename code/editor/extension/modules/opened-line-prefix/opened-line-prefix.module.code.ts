import { firstCapture } from "akasha/code/type/narrowing/modules/first-capture/first-capture.module.code.ts"
import { z } from "zod"

const INDENT = /^([ \t]*)/

const NUMBERED = /^(\d+)([.)])([ \t]+)/

const NUMBERED_FOUND = z.tuple([z.string(), z.string(), z.enum([".", ")"]), z.string()])

const BULLET = /^([-*+])([ \t]+)/

const BULLET_FOUND = z.tuple([z.string(), z.enum(["-", "*", "+"]), z.string()])

const ENDED = /^(?:\d+[.)]|[-*+])[ \t]*$/

function indentOf(line: string): string {
  return firstCapture(INDENT.exec(line)) ?? ""
}

function endsTheList(rest: string, marked: number): boolean {
  return rest.slice(marked).trim() === ""
}

export function indentLength(line: string): number {
  return indentOf(line).length
}

export function endsAList(line: string): boolean {
  return ENDED.test(line.slice(indentLength(line)))
}

export function openedLinePrefix(line: string): string {
  const indent = indentOf(line)
  const rest = line.slice(indent.length)
  const numbered = NUMBERED_FOUND.safeParse(NUMBERED.exec(rest))
  if (numbered.success) {
    const [whole, number, delimiter, spacing] = numbered.data
    if (endsTheList(rest, whole.length)) {
      return indent
    }
    const counted = Number(number) + 1
    return `${indent}${String(counted)}${delimiter}${spacing}`
  }
  const bullet = BULLET_FOUND.safeParse(BULLET.exec(rest))
  if (bullet.success) {
    const [whole, marker, spacing] = bullet.data
    if (endsTheList(rest, whole.length)) {
      return indent
    }
    return `${indent}${marker}${spacing}`
  }
  return indent
}
