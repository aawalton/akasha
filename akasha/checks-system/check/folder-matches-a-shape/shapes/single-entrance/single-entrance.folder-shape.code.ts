import { saidInside } from "../../../../shape-saying/shape-saying.module.code.ts"
import type { Standing } from "../folder-shape.page-type.ts"

const DECLARATION = ".d.ts"

const MOST = 6

function running(paths: readonly string[]): readonly string[] {
  return paths.filter((one) => !one.endsWith(DECLARATION))
}

export function singleEntrance(standing: Standing): readonly string[] {
  const here = running(standing.files)
  const beneath = running(standing.deep)
  const held = here.length + beneath.length
  if (held === 0) return []
  const doors = here.filter((one) => standing.entered(one))
  const under = beneath.filter((one) => standing.entered(one))
  if (doors.length === 1 && under.length === 0) return []
  if (doors.length === 0 && under.length === 0) {
    return [`nothing outside it imports any of its ${held} code files`]
  }
  const said: string[] = []
  if (doors.length === 0) said.push("no file sitting in it is imported from outside")
  if (doors.length > 1) {
    said.push(
      `${doors.length} files sitting in it are imported from outside: ${saidInside(standing.folder, doors, MOST)}`
    )
  }
  if (under.length > 0) {
    said.push(
      `${under.length} files under its subfolders are imported from outside: ${saidInside(standing.folder, under, MOST)}`
    )
  }
  return said
}
