export interface LcccVendorCopy {
  readonly basename: string
  readonly referenceText: string | null
  readonly mirrors: readonly {
    readonly dir: string
    readonly text: string | null
  }[]
}

export interface LcccVendorDrift {
  readonly basename: string
  readonly mirrorDir: string
  readonly referenceText: string | null
  readonly mirrorPresent: boolean
}

export function lcccDriftReason(drift: LcccVendorDrift, referenceDir: string): string {
  if (drift.referenceText === null)
    return `carries a vendored LCCC module the reference copy in ${referenceDir} does not — the vendored copies must hold the same modules`
  if (!drift.mirrorPresent)
    return `is missing a vendored LCCC module the reference copy in ${referenceDir} carries — the vendored copies must hold the same modules`
  return `drifted from the reference copy in ${referenceDir} — the two vendored LCCC copies must be byte-identical`
}

export function findLcccVendorDrift(copies: readonly LcccVendorCopy[]): readonly LcccVendorDrift[] {
  const drift: LcccVendorDrift[] = []
  for (const copy of copies) {
    for (const mirror of copy.mirrors) {
      if (mirror.text === copy.referenceText) continue
      drift.push({
        basename: copy.basename,
        mirrorDir: mirror.dir,
        referenceText: copy.referenceText,
        mirrorPresent: mirror.text !== null,
      })
    }
  }
  return drift
}
