// THE NAME OF THE PROGRAM A PID IS RUNNING, READ WHERE THE KERNEL ALREADY HOLDS IT.
//
// The renamer wants this for one thing: a terminal whose seat has gone is put back to the name of
// the shell running in it. It used to get that by starting `ps` and taking the whole process
// table, which is a subprocess on the extension host for one short string, run every second.
//
// A pid that is gone answers with an empty name rather than throwing, which is the same answer the
// process table gave for a pid it did not hold, so a caller tells the two apart no differently
// than before. A number that is no pid at all reaches that same answer by the same road: there
// is no such file, so nothing is found. A guard turning those away first read as a check on the
// input, but it changed no answer and no test could tell it was there.

import { readFileSync } from "node:fs"

export function shellNameOf(pid: number): string {
  try {
    return readFileSync(`/proc/${pid}/comm`, "utf8").trim()
  } catch {
    return ""
  }
}
