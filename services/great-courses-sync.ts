#!/usr/bin/env bun

import { fetchThrough } from "@shared/pages-query/fetcher"
import { pageQueryInProcess } from "../tools/lib/page-query-in-process.ts"
import { syncGreatCourses } from "../tools/lib/great-courses/sync.ts"
import { trackSyncRun } from "../tools/lib/sync-run/track.ts"

const SOURCE = "the-great-courses"

const SAID = "[great-courses-sync]"

const HELP = `bun services/great-courses-sync.ts — the Great Courses catalogue, read and filed as a page per course

Reads https://www.thegreatcoursesplus.com/allprograms, takes every course and every subject
shelf off it, and writes a \`great-course\` page for each course the collection does not already
hold. A course sits on the "All Great Courses" shelf and on the shelf of every subject naming it.

Nothing is written where the collection's root says it synced inside the last 30 days.

The run stands as a row under \`sync/${SOURCE}\`, and the process exits non-zero where any course
failed, so a failed run is a failed unit rather than silence.

Everything is read and written in this process, off the checkouts on this machine. No credential
stands behind it, and nothing is reached over the network but the catalogue itself.

Driven by the great-courses-sync service, whose document states its cadence. Safe to run by hand.

Usage:
  bun services/great-courses-sync.ts
  --help  This.
`

async function main(): Promise<void> {
  if (process.argv.includes("--help")) {
    console.log(HELP)
    return
  }

  fetchThrough(pageQueryInProcess)

  await trackSyncRun(SOURCE, syncGreatCourses)
}

if (import.meta.main) {
  main().catch((thrown) => {
    console.error(`${SAID} fatal:`, thrown instanceof Error ? thrown.message : thrown)
    process.exit(1)
  })
}
