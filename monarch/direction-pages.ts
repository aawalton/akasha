#!/usr/bin/env bun

import { directionPages, keyOf } from "./files.ts"

export interface Direction {
  readonly name: string
  readonly appliesWhen: string
  readonly directs: string
  readonly task: string
}

function required(path: string, name: string, held: string | null): string {
  if (held === null || held === "") throw new Error(`${path} names no \`${name}\``)
  return held
}

export async function standingDirections(): Promise<readonly Direction[]> {
  const held: Direction[] = []
  for (const page of await directionPages()) {
    held.push({
      name: page.title,
      appliesWhen: required(page.path, "applies-when", keyOf(page, "applies-when")),
      directs: required(page.path, "directs", keyOf(page, "directs")),
      task: required(page.path, "task", keyOf(page, "task")),
    })
  }
  return held.sort((one, other) => one.name.localeCompare(other.name))
}
