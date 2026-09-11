import type { SecretPage } from "akasha/services/secrets/placing/secret-placing.module.code.ts"

export function page(slug: string, ...pairs: readonly (readonly [string, string])[]): SecretPage {
  return {
    slug,
    relPath: `service-system/secrets/pages/${slug}.secret.ts`,
    placements: pairs.map(([resourceName, resourceKey]) => ({ resourceName, resourceKey })),
  }
}
