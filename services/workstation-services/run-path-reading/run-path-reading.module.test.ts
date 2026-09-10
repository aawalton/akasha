import { expect, test } from "bun:test"
import { checkoutHere } from "@akasha/pages/checkout-roots"
import { everyService } from "../service-reading/service-reading.module.code.ts"
import { pathsIn, type Stray, straysIn } from "./run-path-reading.module.code.ts"

const ROOT = checkoutHere()

const WATCHER = "bun temper/watcher/watcher-running/watcher-running.module.code.ts"

const RELAY =
  "-bun readouts/relay/readout-relay.module.code.ts readouts/pages/upkeep-sleep/upkeep-sleep.readout.ts https://alanwalton.com"

const PURGE_RUN =
  "bash code-system/shell-scripts/pages/repos-empty-dir-purge/repos-empty-dir-purge.shell-script.shell.sh"

const PURGE =
  "code-system/shell-scripts/pages/repos-empty-dir-purge/repos-empty-dir-purge.shell-script.shell.sh"

const LOCKED =
  "flock -n /var/tmp/royal-road-sync.lock bun collections/royal-road/syncing/royal-road-syncing.module.code.ts --commit"

const IMAGE =
  "/usr/bin/podman run --rm --name dcgm-exporter nvcr.io/nvidia/k8s/dcgm-exporter:3.3.8-3.6.0-ubuntu22.04"

const EXPORTER = "/home/linuxbrew/.linuxbrew/bin/node_exporter --web.listen-address=:9100"

const LAUNCH = '/usr/bin/protontricks-launch --no-term "%h/Documents/Client.exe"'

const MOVED = "service-system/workstation-services/service-watching/service-watching.module.code.ts"

const PAGE_PATH = "services/workstation-services/pages/a-service.workstation-service.ts"

function said(one: Stray): string {
  return `${one.pagePath} runs \`${one.run}\`, and no file is at \`${one.path}\``
}

test("the file a command runs is the path that command spells", () => {
  expect(pathsIn(WATCHER)).toEqual([
    "temper/watcher/watcher-running/watcher-running.module.code.ts",
  ])
})

test("a command that may fail and names two files names both of them", () => {
  expect(pathsIn(RELAY)).toEqual([
    "readouts/relay/readout-relay.module.code.ts",
    "readouts/pages/upkeep-sleep/upkeep-sleep.readout.ts",
  ])
})

test("a shell script is a file of this repository the same way", () => {
  expect(pathsIn(PURGE_RUN)).toEqual([PURGE])
})

test("a word naming what is not in this repository names no path", () => {
  expect(pathsIn(IMAGE)).toEqual([])
  expect(pathsIn(EXPORTER)).toEqual([])
  expect(pathsIn(LAUNCH)).toEqual([])
  expect(pathsIn(LOCKED)).toEqual([
    "collections/royal-road/syncing/royal-road-syncing.module.code.ts",
  ])
})

test("a command naming a file that is not there is given back with that path", () => {
  const run = `bun ${MOVED}`
  expect(straysIn(ROOT, PAGE_PATH, [WATCHER, run])).toEqual([
    { pagePath: PAGE_PATH, run, path: MOVED },
  ])
  expect(straysIn(ROOT, PAGE_PATH, [WATCHER])).toEqual([])
})

test("every workstation service page names files that are there", () => {
  const read = everyService(ROOT)
  expect("refused" in read).toBe(false)
  if ("refused" in read) return
  expect(read.services.map((one) => one.service.slug)).toContain("service-watching")
  const strays = read.services.flatMap((one) => straysIn(ROOT, one.pagePath, one.service.runs))
  expect(strays.map(said)).toEqual([])
})
