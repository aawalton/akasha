import { existsSync, readFileSync } from "node:fs"
import { resolve } from "node:path"
import { ownRepoRoot } from "@akasha/pages-system/checkout-roots"

const REPO_RELATIVE_CA = "infra/k8s/src/certs/ca.crt"

export function registryCaPath(): string {
  const explicit = process.env.CLUSTER_CA_PATH
  if (explicit !== undefined && explicit !== "") return explicit
  return resolve(ownRepoRoot(), REPO_RELATIVE_CA)
}

export function readRegistryCa(): string {
  const path = registryCaPath()
  if (!existsSync(path)) {
    throw new Error(
      `registry CA not found at ${path}. ` +
        `Set CLUSTER_CA_PATH or ensure ${REPO_RELATIVE_CA} exists.`
    )
  }
  return readFileSync(path, "utf8")
}
