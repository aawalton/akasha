import { existsSync, readFileSync } from "node:fs"
import { join } from "node:path"
import { whyOf } from "akasha/commands/modules/fault-saying/fault-saying.module.code.ts"
import type { Linking } from "akasha/commands/modules/folder-linking/folder-linking.module.code.ts"
import { treeIn } from "akasha/commands/pages/deploy/tree-pinning/deploy-tree-pinning.module.code.ts"
import {
  ourInstalled,
  stagingDir,
  systemctl,
  textFor,
  writeUnit,
} from "akasha/infrastructure/services/workstations/service-installing/service-installing.module.code.ts"
import {
  everyService,
  SERVICE_PAGE_TYPE,
} from "akasha/infrastructure/services/workstations/service-reading/service-reading.module.code.ts"
import {
  asked,
  type Running,
} from "akasha/infrastructure/services/workstations/service-restarting/service-restarting.module.code.ts"
import { counted } from "akasha/utils/text/modules/counted/counted.module.code.ts"

const A_UNIT = "unit"

const RELOAD: readonly string[] = ["daemon-reload"]

export type Drift = {
  readonly unit: string
  readonly page: string
  readonly text: string
}

export type Weighing = {
  readonly drifts: readonly Drift[]
  readonly wrong: readonly string[]
}

const NOTHING_WEIGHED: Weighing = { drifts: [], wrong: [] }

export function installedText(home: string, unit: string): string | null {
  const at = join(stagingDir(home), unit)
  if (!existsSync(at)) return null
  try {
    return readFileSync(at, "utf8")
  } catch {
    return null
  }
}

export function treeInstalled(home: string, owned: readonly string[], at: string | null): string {
  if (at === null) return ""
  for (const unit of owned) {
    const was = installedText(home, unit)
    if (was?.includes(at) === true) return at
  }
  return ""
}

export function weighedIn(root: string, home: string): Weighing {
  const owned = new Set(ourInstalled(home))
  if (owned.size === 0) return NOTHING_WEIGHED
  const under = treeInstalled(home, [...owned], treeIn(root, SERVICE_PAGE_TYPE))
  const read = everyService(root, under)
  if ("refused" in read) {
    return { ...NOTHING_WEIGHED, wrong: [`no workstation unit was weighed — ${read.refused}`] }
  }
  const drifts: Drift[] = []
  for (const one of read.services) {
    for (const [unit, text] of textFor(one)) {
      if (!owned.has(unit)) continue
      if (installedText(home, unit) === text) continue
      drifts.push({ unit, page: one.pagePath, text })
    }
  }
  return { drifts, wrong: [] }
}

export function landedOver(weighed: Weighing, home: string, run: Running): Linking {
  const said: string[] = []
  const wrong: string[] = [...weighed.wrong]
  let written = 0
  for (const one of weighed.drifts) {
    try {
      writeUnit(home, one.unit, one.text)
      written += 1
      said.push(`wrote ${one.unit} as ${one.page} states it`)
    } catch (thrown) {
      wrong.push(`${one.unit} drifted from ${one.page} and was not written — ${whyOf(thrown)}`)
    }
  }
  if (written > 0) {
    const many = counted(written, A_UNIT)
    const reload = asked(run, RELOAD)
    if (reload.code !== 0) {
      wrong.push(
        `systemd was not told to read ${many} again, so what is loaded is what was loaded — ${reload.out}`
      )
      return { said, wrong }
    }
    said.push(`told systemd to read ${many} again`)
  }
  return { said, wrong }
}

export function unitsLanded(root: string, home: string, run: Running = systemctl): Linking {
  try {
    return landedOver(weighedIn(root, home), home, run)
  } catch (thrown) {
    return {
      said: [],
      wrong: [`no workstation unit was kept as its page states it — ${whyOf(thrown)}`],
    }
  }
}
