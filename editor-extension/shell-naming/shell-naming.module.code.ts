// THE NAME OF THE PROGRAM A PID IS RUNNING, READ WHERE THE KERNEL ALREADY HOLDS IT.
//
// The renamer wants this for one thing: a terminal whose seat has gone is put back to the name of
// the shell running in it. It used to get that by starting `ps` and taking the whole process
// table, which is a subprocess on the extension host for one short string, run every second.
//
// A pid that is gone answers with an empty name rather than throwing, which is the same answer the
// process table gave for a pid it did not hold, so a caller tells the two apart no differently
// than before.

import { readFileSync } from "node:fs"

export function shellNameOf(pid: number): string {
  if (!Number.isInteger(pid) || pid <= 0) return ""
  try {
    return readFileSync(`/proc/${pid}/comm`, "utf8").trim()
  } catch {
    return ""
  }
}
