export interface CatalogWalkDomain {
  readonly key: string
  readonly collect: (this: void, onComplete: (this: void) => void) => void
}

export interface CatalogWalkDeps {
  readonly attempt: (this: void, run: (this: void) => void) => string | undefined
  readonly schedule: (this: void, run: (this: void) => void, delayMs: number) => void
  readonly hasCollected: (this: void, domainKey: string) => boolean
  readonly log: (this: void, message: string) => void
}

export interface CatalogWalkOptions {
  readonly domainDelayMs: number
  readonly domainTimeoutMs: number
}

export interface CatalogWalkSkip {
  readonly domain: string
  readonly reason: string
}

export interface CatalogWalkVerdict {
  readonly completed: boolean
  readonly collected: readonly string[]
  readonly skips: readonly CatalogWalkSkip[]
}

export interface CatalogDomainAttempt {
  readonly domain: string
  readonly failure: string | undefined
}

const SILENT_COLLECTOR_REASON = "collector reported completion but wrote no catalog data"

export function summarizeCatalogWalk(
  this: void,
  attempts: readonly CatalogDomainAttempt[],
  hasCollected: (this: void, domainKey: string) => boolean
): CatalogWalkVerdict {
  const collected: string[] = []
  const skips: CatalogWalkSkip[] = []
  for (const attempt of attempts) {
    if (hasCollected(attempt.domain)) {
      collected.push(attempt.domain)
    } else {
      skips.push({
        domain: attempt.domain,
        reason: attempt.failure ?? SILENT_COLLECTOR_REASON,
      })
    }
  }
  return { completed: skips.length === 0, collected, skips }
}

export function runCatalogWalk(
  this: void,
  domains: readonly CatalogWalkDomain[],
  deps: CatalogWalkDeps,
  options: CatalogWalkOptions,
  onFinished: (this: void, verdict: CatalogWalkVerdict) => void
): undefined {
  const attempts: CatalogDomainAttempt[] = []

  function runNext(this: void, index: number): undefined {
    if (index >= domains.length) {
      onFinished(summarizeCatalogWalk(attempts, deps.hasCollected))
      return
    }
    const domain = domains[index]
    if (domain === undefined) {
      onFinished(summarizeCatalogWalk(attempts, deps.hasCollected))
      return
    }

    const domainKey = domain.key
    let settled = false
    function settle(this: void, failure: string | undefined): undefined {
      if (settled) return
      settled = true
      attempts.push({ domain: domainKey, failure })
      deps.schedule(function (this: void): undefined {
        runNext(index + 1)
      }, options.domainDelayMs)
    }

    deps.log(`Collecting ${domainKey}...`)

    deps.schedule(function (this: void): undefined {
      settle(`collector did not complete within ${options.domainTimeoutMs}ms`)
    }, options.domainTimeoutMs)

    const failure = deps.attempt(function (this: void): undefined {
      domain.collect(function (this: void): undefined {
        settle(undefined)
      })
    })
    if (failure !== undefined) settle(failure)
  }

  runNext(0)
}
