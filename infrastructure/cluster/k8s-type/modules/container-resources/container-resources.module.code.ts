import { valuedAt } from "akasha/page/index/modules/reading/index-reading.module.code.ts"
import type { Reading } from "akasha/page/index/modules/shape/index-shape.module.code.ts"
import { codeRoot } from "akasha/page/modules/code-root/code-root.module.code.ts"
import {
  numberAt,
  slugOf,
  type Value,
} from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"

const PROMISED_CPU = "minCpuMillicores"

const MOST_CPU = "maxCpuMillicores"

const PROMISED_MEMORY = "minMemoryMb"

const ENDED_MEMORY = "killMemoryMb"

const MILLI_A_CORE = 1000

const MB_A_GB = 1024

type Quantities = { readonly cpu?: string; readonly memory?: string }

export type Resources = { readonly requests: Quantities; readonly limits: Quantities }

type Manifested = { readonly type: string; readonly slug: string }

export function cpuQuantity(millicores: number): string {
  return millicores % MILLI_A_CORE === 0
    ? String(millicores / MILLI_A_CORE)
    : `${String(millicores)}m`
}

export function memoryQuantity(mb: number): string {
  return mb % MB_A_GB === 0 ? `${String(mb / MB_A_GB)}Gi` : `${String(mb)}Mi`
}

function quantitiesOf(cpu: number | null, memory: number | null): Quantities {
  return {
    ...(cpu === null ? {} : { cpu: cpuQuantity(cpu) }),
    ...(memory === null ? {} : { memory: memoryQuantity(memory) }),
  }
}

export function resourcesIn(value: Value): Resources {
  return {
    requests: quantitiesOf(numberAt(value, PROMISED_CPU), numberAt(value, PROMISED_MEMORY)),
    limits: quantitiesOf(numberAt(value, MOST_CPU), numberAt(value, ENDED_MEMORY)),
  }
}

function pageValueOf(manifest: Manifested, given: string | Reading): Value {
  return valuedAt(given, slugOf(manifest.type), manifest.slug).value
}

export function resourcesOf(manifest: Manifested, given: string | Reading = codeRoot()): Resources {
  return resourcesIn(pageValueOf(manifest, given))
}

export function killMemoryMbOf(
  manifest: Manifested,
  given: string | Reading = codeRoot()
): number | null {
  return numberAt(pageValueOf(manifest, given), ENDED_MEMORY)
}

type Asked = Readonly<Record<string, string>>

export function resourcesWith(
  held: Resources,
  asked: Asked
): { readonly requests: Asked; readonly limits: Asked } {
  return { requests: { ...held.requests, ...asked }, limits: { ...held.limits, ...asked } }
}
