import {
  manifestIn,
  refusalsOver,
} from "akasha/checks/code-checks/pages/extension-host-reaches-no-bun-code/extension-host-reaches-no-bun-code.code-check.decision.code.ts"
import {
  input,
  textNamed,
  textsBy,
} from "akasha/checks/modules/change-walking/change-walking.module.code.ts"

const REACHING = textsBy(
  "the extension's manifest and every text",
  (path, shadow) => textNamed(path) || path === manifestIn(shadow.index)
)

export const extensionHostReachesNoBunCode = input(REACHING, (change, shadow) => {
  const beside = shadow.index.manifestsBeside(shadow.index.fileKeysAt())
  const manifests = [...new Set([...beside, ...change.changed])]
  return refusalsOver(change, manifests, manifestIn(shadow.index))
})
