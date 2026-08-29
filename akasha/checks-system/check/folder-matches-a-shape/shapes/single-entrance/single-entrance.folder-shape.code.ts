import type { Standing } from "../folder-shape.page-type.ts"

const DECLARATION = ".d.ts"

const MOST = 6

function running(paths: readonly string[]): readonly string[] {
  return paths.filter((one) => !one.endsWith(DECLARATION))
}

function named(folder: string, paths: readonly string[]): string {
  const some = paths.slice(0, MOST).map((one) => one.slice(folder.length + 1))
  const rest = paths.length - some.length
  return rest === 0 ? some.join(", ") : `${some.join(", ")} and ${rest} more`
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
      `${doors.length} files sitting in it are imported from outside: ${named(standing.folder, doors)}`
    )
  }
  if (under.length > 0) {
    said.push(
      `${under.length} files under its subfolders are imported from outside: ${named(standing.folder, under)}`
    )
  }
  return said
}
