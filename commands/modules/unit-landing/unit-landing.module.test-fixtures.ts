import { mkdirSync, realpathSync, symlinkSync, writeFileSync } from "node:fs"
import { join } from "node:path"
import type { Weighing } from "akasha/commands/modules/unit-landing/unit-landing.module.code.ts"
import {
  type Ran,
  stagingDir,
  systemdDir,
} from "akasha/infrastructure/services/workstations/service-installing/service-installing.module.code.ts"
import { scratchWorld } from "akasha/utils/fs/scratching/scratching.module.code.ts"

const scratch = scratchWorld()

export const sweep = scratch.sweep

export const UNIT = "held.service"

export const TIMER = "held.timer"

export const PAGE = "one/held.service-workstation.ts"

export const RELOADED = ["daemon-reload"]

export const STARTED = "try-restart"

export const WAS = `${[
  "# Written from one/held.service-workstation.ts by akasha deploy. Edits here are lost.",
  "",
  "[Unit]",
  "Description=A thing",
  "Documentation=file://one/held.service-workstation.ts",
  "",
  "[Service]",
  "Type=simple",
  "WorkingDirectory=%h/repos/akasha",
  "Environment=PATH=/usr/bin",
  "Environment=AKASHA_ROOT=%h/repos/akasha",
  "ExecStart=/usr/bin/env bash -c 'exec bun one.ts'",
  "Restart=always",
  "",
  "[Install]",
  "WantedBy=default.target",
].join("\n")}\n`

export const TICKS =
  "[Timer]\nOnCalendar=hourly\nRandomizedDelaySec=300\nAccuracySec=60\nPersistent=true\n"

export function rooted(): string {
  return realpathSync(scratch.rootFor("akasha-unit-landing-"))
}

export function homeWith(units: Readonly<Record<string, string>>): string {
  const home = rooted()
  mkdirSync(stagingDir(home), { recursive: true })
  mkdirSync(systemdDir(home), { recursive: true })
  for (const [name, text] of Object.entries(units)) {
    writeFileSync(join(stagingDir(home), name), text)
    symlinkSync(join(stagingDir(home), name), join(systemdDir(home), name))
  }
  return home
}

export function nothingWeighed(): Weighing {
  return { drifts: [], under: "", wrong: [] }
}

export function oneDrift(unit: string, text: string, startsFor: readonly string[] = []): Weighing {
  return { ...nothingWeighed(), drifts: [{ unit, page: PAGE, text, startsFor }] }
}

export function taking(codes: Readonly<Record<string, number>> = {}): {
  readonly calls: readonly (readonly string[])[]
  readonly run: (args: readonly string[]) => Ran
} {
  const calls: (readonly string[])[] = []
  return {
    calls,
    run: (args) => {
      calls.push([...args])
      const code = codes[args.join(" ")] ?? 0
      return { code, out: code === 0 ? "" : "systemctl would not" }
    },
  }
}

export function without(text: string, was: string, now: string): string {
  return text.replace(was, now)
}
