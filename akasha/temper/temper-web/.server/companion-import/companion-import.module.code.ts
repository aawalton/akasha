import { createPage } from "@akasha/pages-access/create"
import { getPages } from "@akasha/pages-access/get"
import { patchPage } from "@akasha/pages-access/patch"
import { getUser } from "@akasha/supabase-rr/auth-server"
import { createServerClient } from "@akasha/supabase-rr/server-client"
import { extractCompanionMetadata } from "@akasha/temper-build-metadata/build-metadata"
import { decodeCompanion } from "@akasha/temper-companion-codec/companion-codec"
import { companionWeaponTypes } from "@akasha/temper-companions-core/companion-weapon-types"
import { companions } from "@akasha/temper-companions-core/companions"
import type { BuildHash, BuildId } from "@akasha/temper-formula-framework/branded-id"
import { buildId as toBuildId } from "@akasha/temper-formula-framework/branded-id"
import type { Json } from "@akasha/utils-narrow/json-value"
import { requireFirst } from "@akasha/utils-narrow/require-first"

function asJson(value: Record<string, unknown>): Json {
  return value as Json
}

export type ImportCompanionResult =
  | { buildId: BuildId; buildName: string }
  | { error: "not-authenticated" }
  | { error: "invalid-hash" }
  | { error: "create-failed"; message: string }

export async function importCompanionFromHash(
  request: Request,
  hash: BuildHash
): Promise<{ result: ImportCompanionResult; headers: Headers }> {
  const { user, headers: authHeaders } = await getUser(request)
  if (!user) {
    return { result: { error: "not-authenticated" }, headers: authHeaders }
  }

  const userId = user.id
  const { headers } = createServerClient(request)
  for (const value of authHeaders.getSetCookie()) {
    headers.append("Set-Cookie", value)
  }

  const buildState = decodeCompanion(hash)
  if (!buildState) {
    return { result: { error: "invalid-hash" }, headers }
  }

  const companionId = buildState.companion.id

  const companionName = requireFirst(companions.data[companionId].name.split(" "))
  const mainHand = buildState.equipment.weapons["main-hand"]
  const weaponName =
    mainHand.itemType === "weapon" && mainHand.data.type !== "no-type"
      ? companionWeaponTypes.data[mainHand.data.type].name
      : ""
  buildState.name = weaponName !== "" ? `${companionName} ${weaponName}` : companionName

  const buildMetadata = extractCompanionMetadata(buildState)

  const { rows: existingBuilds } = await getPages({
    pageTypeSlug: "companion-build",
    where: [
      { key: "userId", eq: userId },
      { key: "buildHash", eq: hash },
    ],
    limit: 1,
  })
  const firstExistingBuild = existingBuilds[0]
  if (firstExistingBuild && typeof firstExistingBuild.id === "string") {
    return {
      result: { buildId: toBuildId(firstExistingBuild.id), buildName: buildState.name },
      headers,
    }
  }

  const { rows: userCompanions } = await getPages({
    pageTypeSlug: "temper-companion-progress",
    where: [
      { key: "accountPage", eq: userId },
      { key: "companionId", eq: companionId },
    ],
    limit: 1,
  })
  const entity = userCompanions[0]

  try {
    const created = await createPage({
      pageTypeSlug: "companion-build",
      properties: {
        userId,
        accountPage: userId,
        buildName: buildState.name,
        buildHash: hash,
        buildMetadata: asJson({ ...buildMetadata }),
        visibility: "live",
      },
    })
    const newBuildId = typeof created.id === "string" ? created.id : ""

    if (entity) {
      await patchPage({
        pageTypeSlug: "temper-companion-progress",
        where: [{ key: "companionId", eq: companionId }],
        set: { liveBuildId: newBuildId },
      })
    } else {
      await createPage({
        pageTypeSlug: "temper-companion-progress",
        properties: {
          userId,
          accountPage: userId,
          companionId,
          liveBuildId: newBuildId,
        },
      })
    }

    return {
      result: { buildId: toBuildId(newBuildId), buildName: buildState.name },
      headers,
    }
  } catch (e) {
    return {
      result: { error: "create-failed", message: e instanceof Error ? e.message : "Unknown error" },
      headers,
    }
  }
}
