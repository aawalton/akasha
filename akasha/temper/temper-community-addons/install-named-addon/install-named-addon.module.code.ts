import { mkdir } from "node:fs/promises"
import { InputError, OperationalError } from "@akasha/errors-core/exit-code"
import { downloadAndInstall } from "../addon-download/addon-download.module.code.ts"
import { findCatalogEntryByName } from "../addon-update-plan/addon-update-plan.module.code.ts"
import { fetchCatalog, fetchFileDetails } from "../esoui-catalog/esoui-catalog.module.code.ts"
import { readInstalledAddons } from "../installed-addons/installed-addons.module.code.ts"

export type InstallByNameOpts = {
  readonly addonsPath: string
  readonly force: boolean
  readonly ownedNames: ReadonlySet<string>
}

export type InstallByNameOutcome =
  | { readonly action: "installed"; readonly dirs: readonly string[]; readonly version: string }
  | { readonly action: "skipped"; readonly dirs: readonly string[] }

async function foldersThere(addonsPath: string): Promise<ReadonlySet<string>> {
  try {
    return new Set((await readInstalledAddons(addonsPath)).map((one) => one.dir))
  } catch {
    return new Set()
  }
}

export async function installNamedAddon(
  name: string,
  opts: InstallByNameOpts
): Promise<InstallByNameOutcome> {
  const entry = findCatalogEntryByName(await fetchCatalog(), name)
  if (entry === undefined) {
    throw new InputError(
      `no ESOUI entry matches ${JSON.stringify(name)} by title or by install folder`
    )
  }
  if (entry.dirs.length === 0) {
    throw new OperationalError(
      `ESOUI entry ${JSON.stringify(entry.name)} names no install folder, so where it would go is unknown`
    )
  }

  const owned = entry.dirs.filter((dir) => opts.ownedNames.has(dir))
  if (owned.length > 0) {
    throw new InputError(
      `ESOUI entry ${JSON.stringify(entry.name)} installs ${owned.join(", ")}, which the deploy owns. Installing it would replace the deploy's own port with an upstream copy, and the next deploy would replace it back. Take the folder out of the deploy's ownership first; forcing is consent to install a third-party addon again, never to drop an upstream archive over a folder the deploy owns.`
    )
  }

  if (!opts.force) {
    const there = await foldersThere(opts.addonsPath)
    if (entry.dirs.every((dir) => there.has(dir))) {
      return { action: "skipped", dirs: entry.dirs }
    }
  }

  await mkdir(opts.addonsPath, { recursive: true })
  const details = await fetchFileDetails(entry.uid)
  const done = await downloadAndInstall(details, entry.dirs, opts.addonsPath)
  if (done.installedDirs.length === 0) {
    throw new OperationalError(
      `the ESOUI download for file ${entry.uid} carried none of ${entry.dirs.join(", ")}`
    )
  }
  return { action: "installed", dirs: done.installedDirs, version: done.version }
}
