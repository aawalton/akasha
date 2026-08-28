const FIXTURE_DIR = /(^|\/)__fixtures__(\/|$)/

export function isFixtureFile(relPath: string): boolean {
  return FIXTURE_DIR.test(relPath)
}
