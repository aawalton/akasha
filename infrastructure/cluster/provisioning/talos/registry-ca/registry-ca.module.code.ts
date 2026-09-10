import { existsSync, readFileSync } from "node:fs"
import { dirname, join, resolve } from "node:path"
import { clusterCa } from "akasha/infrastructure/cluster/provisioning/cluster-ca/cluster-ca.certificate-authority.ts"
import { authorityCertificate } from "akasha/infrastructure/networks/certificates/authorities/properties/authority-certificate.file-property.ts"
import { ownRepoRoot } from "akasha/pages/checkout-roots/checkout-roots.module.code.ts"
import { listedById } from "akasha/pages/indexes/reading/index-reading.module.code.ts"
import { optionalEnv } from "akasha/utils/narrow/require-env/require-env.module.code.ts"

function certificateUnder(root: string): string {
  const listed = listedById(root, clusterCa.id)
  if (listed === null) {
    throw new Error(
      `no page carries the id \`${clusterCa.id}\`, so where the cluster's authority sits is unsaid`
    )
  }
  return join(dirname(listed.path), authorityCertificate.fileName)
}

export function registryCaPath(): string {
  const explicit = optionalEnv("CLUSTER_CA_PATH")
  if (explicit !== undefined) return explicit
  const root = ownRepoRoot()
  return resolve(root, certificateUnder(root))
}

export function readRegistryCa(): string {
  const path = registryCaPath()
  if (!existsSync(path)) {
    throw new Error(
      `registry CA not found at ${path}. ` +
        `Set CLUSTER_CA_PATH or write the authority's certificate there.`
    )
  }
  return readFileSync(path, "utf8")
}
