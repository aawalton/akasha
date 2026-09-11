import { afterAll, expect, test } from "bun:test"
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs"
import { dirname, join } from "node:path"
import { pathsIn, straysIn } from "./run-path-reading.module.code.ts"

const WATCHER_AT = "temper/watcher/a-watcher/a-watcher.module.code.ts"

const WATCHER = `bun ${WATCHER_AT}`

const RELAY_AT = "readouts/relay/a-relay.module.code.ts"

const READOUT_AT = "readouts/pages/a-readout/a-readout.readout.ts"

const RELAY = `-bun ${RELAY_AT} ${READOUT_AT} https://alanwalton.com`

const PURGE = "code-system/shell-scripts/pages/a-purge/a-purge.shell-script.shell.sh"

const PURGE_RUN = `bash ${PURGE}`

const LOCKED_AT = "collections/royal-road/syncing/a-syncing.module.code.ts"

const LOCKED = `flock -n /var/tmp/royal-road-sync.lock bun ${LOCKED_AT} --commit`

const IMAGE =
  "/usr/bin/podman run --rm --name dcgm-exporter nvcr.io/nvidia/k8s/dcgm-exporter:3.3.8-3.6.0-ubuntu22.04"

const EXPORTER = "/home/linuxbrew/.linuxbrew/bin/node_exporter --web.listen-address=:9100"

const LAUNCH = '/usr/bin/protontricks-launch --no-term "%h/Documents/Client.exe"'

const MOVED = "service-system/workstation-services/service-watching/service-watching.module.code.ts"

const PAGE_PATH = "services/workstation-services/pages/a-service.workstation-service.ts"

const SCRATCH_AT = process.env["SCRATCH_AT"] ?? "/var/tmp"

const scratch = mkdtempSync(join(SCRATCH_AT, "run-path-reading-"))

mkdirSync(join(scratch, dirname(WATCHER_AT)), { recursive: true })
writeFileSync(join(scratch, WATCHER_AT), "")

afterAll(() => {
  rmSync(scratch, { recursive: true, force: true })
})

test("the file a command runs is the path that command spells", () => {
  expect(pathsIn(WATCHER)).toEqual([WATCHER_AT])
})

test("a command that may fail and names two files names both of them", () => {
  expect(pathsIn(RELAY)).toEqual([RELAY_AT, READOUT_AT])
})

test("a shell script is a file of this repository the same way", () => {
  expect(pathsIn(PURGE_RUN)).toEqual([PURGE])
})

test("a word naming what is not in this repository names no path", () => {
  expect(pathsIn(IMAGE)).toEqual([])
  expect(pathsIn(EXPORTER)).toEqual([])
  expect(pathsIn(LAUNCH)).toEqual([])
  expect(pathsIn(LOCKED)).toEqual([LOCKED_AT])
})

test("a command naming a file that is not there is given back with that path", () => {
  const run = `bun ${MOVED}`
  expect(straysIn(scratch, PAGE_PATH, [WATCHER, run])).toEqual([
    { pagePath: PAGE_PATH, run, path: MOVED },
  ])
  expect(straysIn(scratch, PAGE_PATH, [WATCHER])).toEqual([])
})
