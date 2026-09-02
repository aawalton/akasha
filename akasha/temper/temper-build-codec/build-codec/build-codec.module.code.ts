import { base64urlToBytes, bytesToBase64url } from "@akasha/temper-build-hash/build-hash-base64url"
import type { CharacterState } from "@akasha/temper-character-build/build-types"
import type { BuildHash } from "@akasha/temper-formula-framework/branded-id"
import { buildHash } from "@akasha/temper-formula-framework/branded-id"
import {
  CHARACTER_BUILD_TYPE,
  decodeV48,
  ESO_VERSION_48,
} from "../build-codec-v48/build-codec-v48.module.code.ts"
import { decodeV49, ESO_VERSION_49 } from "../build-codec-v49/build-codec-v49.module.code.ts"
import { decodeV50, ESO_VERSION_50 } from "../build-codec-v50/build-codec-v50.module.code.ts"
import { decodeV51, ESO_VERSION_51 } from "../build-codec-v51/build-codec-v51.module.code.ts"
import {
  decodeV52,
  ESO_VERSION_52,
  encodeV52,
} from "../build-codec-v52/build-codec-v52.module.code.ts"

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
      build = decodeV48(bytes)
      break
    case ESO_VERSION_49:
      build = decodeV49(bytes)
      break
    case ESO_VERSION_50:
      build = decodeV50(bytes)
      break
    case ESO_VERSION_51:
      build = decodeV51(bytes)
      break
    case ESO_VERSION_52:
      build = decodeV52(bytes)
      break
    default:
      console.warn(`Unknown build code version: ${version}`)
      return null
  }

  return build
}
