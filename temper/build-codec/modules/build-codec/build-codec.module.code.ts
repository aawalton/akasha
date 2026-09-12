import {
  CHARACTER_BUILD_TYPE,
  decodeV52,
  ESO_VERSION_52,
  encodeV52,
} from "akasha/temper/build-codec/modules/build-codec-v52/build-codec-v52.module.code.ts"
import {
  base64urlToBytes,
  bytesToBase64url,
} from "akasha/temper/build-hash/build-hash-base64url/build-hash-base64url.module.code.ts"
import type { CharacterState } from "akasha/temper/character-build/build-types/build-types.module.code.ts"
import type { BuildHash } from "akasha/temper/formula-framework/modules/branded-id/branded-id.module.code.ts"
import { buildHash } from "akasha/temper/formula-framework/modules/branded-id/branded-id.module.code.ts"

export const ESO_VERSION_48 = 48

export function encodeBuild(build: CharacterState): BuildHash {
  const bytes = encodeV52(build)
  return buildHash(bytesToBase64url(bytes))
}

export function decodeBuild(encoded: BuildHash): CharacterState | null {
  const bytes = base64urlToBytes(encoded)
  if (!bytes || bytes.length === 0) {
    return null
  }

  const firstByte = bytes[0]

  if (firstByte !== CHARACTER_BUILD_TYPE) {
    console.warn(`Unknown build code type: ${firstByte}`)
    return null
  }

  const version = bytes[1]
  let build: CharacterState | null
  switch (version) {
    case ESO_VERSION_48:
    case ESO_VERSION_52:
      build = decodeV52(bytes)
      break
    default:
      console.warn(`Unknown build code version: ${version}`)
      return null
  }

  return build
}
