const AUTHOR = "test"

const VERSION = "1.0.0"

const ADDON_VERSION = 100

const API_VERSION = ["101041"]

export type AddonFixtureManifest = {
  readonly name: string
  readonly title: string
  readonly description: string
  readonly author: string
  readonly version: string
  readonly addonVersion: number
  readonly apiVersion: readonly string[]
  readonly savedVariables: readonly string[]
  readonly dependsOn: readonly string[]
}

export function addonManifestOf(name: string): AddonFixtureManifest {
  return {
    name,
    title: name,
    description: `${name} for a test`,
    author: AUTHOR,
    version: VERSION,
    addonVersion: ADDON_VERSION,
    apiVersion: API_VERSION,
    savedVariables: [],
    dependsOn: [],
  }
}
