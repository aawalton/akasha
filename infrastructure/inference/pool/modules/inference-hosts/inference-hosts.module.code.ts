import type { InferenceHost } from "akasha/infrastructure/inference/pool/modules/inference-schema/inference-schema.module.code.ts"
import { valuesOfType } from "akasha/page/index/modules/reading/index-reading.module.code.ts"
import { codeRoot } from "akasha/page/modules/code-root/code-root.module.code.ts"
import {
  textAt,
  type Value,
} from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"

const HOST_PAGE_TYPE = "host"

function inferenceHostIn(path: string, value: Value): InferenceHost | null {
  const condaScript = textAt(value, "condaScript")
  if (condaScript === null) return null
  const name = textAt(value, "slug")
  const address = textAt(value, "address")
  const loginUser = textAt(value, "loginUser")
  const keyPath = textAt(value, "keyPath")
  const home = textAt(value, "home")
  if (
    name === null ||
    address === null ||
    loginUser === null ||
    keyPath === null ||
    home === null
  ) {
    throw new Error(
      `${path} states a conda script, and no slug, address, login user, key path and home to reach it by`
    )
  }
  return { name, address, loginUser, keyPath, home, condaScript }
}

export function inferenceHosts(root: string = codeRoot()): readonly InferenceHost[] {
  const found: InferenceHost[] = []
  for (const one of valuesOfType(root, HOST_PAGE_TYPE)) {
    const host = inferenceHostIn(one.path, one.value)
    if (host !== null) found.push(host)
  }
  return found
}

export function getHost(name: string, root: string = codeRoot()): InferenceHost {
  const known = inferenceHosts(root)
  const host = known.find((one) => one.name === name)
  if (host === undefined) {
    throw new Error(
      `unknown inference host: ${name} (known: ${known.map((one) => one.name).join(", ")})`
    )
  }
  return host
}
