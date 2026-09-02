"use client"

import { createPage } from "@akasha/pages-access/create"
import { deletePage } from "@akasha/pages-access/delete"
import { patchPage } from "@akasha/pages-access/patch"
import { NEVER_MATCH_VALUE } from "@akasha/pages-access/sentinels"
import { useOptimisticCreatePage } from "@akasha/pages-ui/supabase/mutations/use-optimistic-create-page"
import { useOptimisticDeletePage } from "@akasha/pages-ui/supabase/mutations/use-optimistic-delete-page"
import { useOptimisticPatchPage } from "@akasha/pages-ui/supabase/mutations/use-optimistic-patch-page"
import { usePagesSupabase } from "@akasha/pages-ui/supabase/use-pages"
import { useUserId } from "@akasha/pages-ui/use-user-id"
import type { CharacterBuildMetadata } from "@akasha/temper-build-metadata/build-metadata"
import type { CharacterVisibility } from "@akasha/temper-character-build/build-types"
import {
  type RoleId,
  characterRoles as roles,
} from "@akasha/temper-character-sources/character-roles"
import type { Json } from "@akasha/utils-narrow/json-value"
import { useMemo } from "react"

const CHARACTER_BUILD_PAGE_TYPE_SLUG = "character-build"

export interface CharacterBuildRow {
  id: string
  userId: string
  buildHash: string
  buildMetadata: CharacterBuildMetadata | null
  visibility: string
  correlationId: string | null
  esoCharacterId?: string
  createdAt: number
  updatedAt: number
}

function parseTimestamp(value: unknown): number {
  if (typeof value === "number") return value
  if (typeof value === "string") {
    const parsed = Date.parse(value)
    if (!Number.isNaN(parsed)) return parsed
  }
  return 0
}

function parseString(value: unknown, fallback = ""): string {
  return typeof value === "string" ? value : fallback
}

function parseStringOrNull(value: unknown): string | null {
  return typeof value === "string" ? value : null
}

function parseBuildMetadata(value: unknown): CharacterBuildMetadata | null {
  if (value === null || typeof value !== "object" || Array.isArray(value)) return null
  const obj: Record<string, unknown> = { ...value }
  const { name, description, characterName, baseRoles, targetCount } = obj
  if (
    typeof name !== "string" ||
    typeof description !== "string" ||
    typeof characterName !== "string"
  ) {
    return null
  }
  const validRoleIds = new Set<string>(roles.ids)
  const validatedRoles = Array.isArray(baseRoles)
    ? baseRoles.filter((r): r is RoleId => typeof r === "string" && validRoleIds.has(r))
    : undefined
  return {
    name,
    description,
    characterName,
    ...(validatedRoles ? { baseRoles: validatedRoles } : {}),
    ...(typeof targetCount === "number" ? { targetCount } : {}),
  }
}

function mapBuildRow(row: Record<string, unknown>): CharacterBuildRow {
  return {
    id: parseString(row.id),
    userId: parseString(row.userId),
    buildHash: parseString(row.buildHash),
    buildMetadata: parseBuildMetadata(row.buildMetadata),
    visibility: parseString(row.visibility, "private"),
    correlationId: parseStringOrNull(row.correlationId),
    createdAt: parseTimestamp(row.createdAt),
    updatedAt: parseTimestamp(row.updatedAt),
  }
}

function buildMetadataToJson(meta: CharacterBuildMetadata): Json {
  const json: Json = {
    name: meta.name,
    description: meta.description,
    characterName: meta.characterName,
    ...(meta.baseRoles ? { baseRoles: [...meta.baseRoles] } : {}),
    ...(meta.targetCount != null ? { targetCount: meta.targetCount } : {}),
  }
  return json
}

export function useCharacterList() {
  const userId = useUserId()
  const { rows, isLoading, error } = usePagesSupabase({
    pageTypeSlug: CHARACTER_BUILD_PAGE_TYPE_SLUG,
    where:
      userId != null ? [{ key: "userId", eq: userId }] : [{ key: "userId", eq: NEVER_MATCH_VALUE }],
    order: [{ by: "updatedAt", dir: "desc" }],
    limit: 500,
  })

  const builds = useMemo<CharacterBuildRow[]>(() => {
    if (userId == null) return []
    return rows.map(mapBuildRow)
  }, [rows, userId])

  return {
    builds,
    isLoading: userId != null ? isLoading : false,
    isError: error !== null,
    error,
    retry: undefined,
  }
}

export function useCharacter(buildId: string) {
  const userId = useUserId()
  const { rows, isLoading, error } = usePagesSupabase({
    pageTypeSlug: CHARACTER_BUILD_PAGE_TYPE_SLUG,
    where: [{ key: "id", eq: buildId }],
    limit: 1,
  })

  const runPatch = useOptimisticPatchPage((args) => patchPage(args))
  const runDelete = useOptimisticDeletePage((args) => deletePage(args))

  const build = useMemo<CharacterBuildRow | undefined>(() => {
    const row = rows[0]
    if (!row) return undefined
    return mapBuildRow(row)
  }, [rows])

  const updateBuild = async (buildHash: string, buildMetadata: CharacterBuildMetadata) => {
    await runPatch({
      pageTypeSlug: CHARACTER_BUILD_PAGE_TYPE_SLUG,
      where: [{ key: "id", eq: buildId }],
      set: {
        buildHash,
        buildMetadata: buildMetadataToJson(buildMetadata),
      },
    })
  }

  const updateMeta = async (meta: {
    name?: string
    description?: string
    characterName?: string
    targetCount?: number
  }) => {
    if (!build) return
    const base: CharacterBuildMetadata = build.buildMetadata ?? {
      name: "",
      description: "",
      characterName: "",
    }
    const next: CharacterBuildMetadata = { ...base, ...meta }
    await runPatch({
      pageTypeSlug: CHARACTER_BUILD_PAGE_TYPE_SLUG,
      where: [{ key: "id", eq: buildId }],
      set: { buildMetadata: buildMetadataToJson(next) },
    })
  }

  const deleteBuild = async () => {
    if (userId == null) throw new Error("Not authenticated")
    await runDelete({
      pageTypeSlug: CHARACTER_BUILD_PAGE_TYPE_SLUG,
      where: [{ key: "id", eq: buildId }],
    })
  }

  const setVisibility = async (visibility: Exclude<CharacterVisibility, "live" | "target">) => {
    await runPatch({
      pageTypeSlug: CHARACTER_BUILD_PAGE_TYPE_SLUG,
      where: [{ key: "id", eq: buildId }],
      set: { visibility },
    })
  }

  return {
    build,
    buildHash: build?.buildHash ?? null,
    buildMetadata: build?.buildMetadata ?? null,
    updateBuild,
    updateMeta,
    deleteBuild,
    setVisibility,
    isLoading,
    isError: error !== null,
    error,
    retry: undefined,
  }
}

export function useCharacterLifecycle() {
  const userId = useUserId()
  const runCreate = useOptimisticCreatePage((args) => createPage(args))
  const runPatch = useOptimisticPatchPage((args) => patchPage(args))

  const createNew = async (args: {
    id: string
    userId: string
    buildHash: string
    buildMetadata: CharacterBuildMetadata
    encodedBuild?: string
  }) => {
    await runCreate({
      id: args.id,
      pageTypeSlug: CHARACTER_BUILD_PAGE_TYPE_SLUG,
      properties: {
        userId: args.userId,
        accountPage: args.userId,
        buildHash: args.buildHash,
        buildMetadata: buildMetadataToJson(args.buildMetadata),
        visibility: "private",
        correlationId: args.id,
      },
    })
  }

  const remix = async (args: {
    sourceId: string
    newId: string
    newBuildHash: string
    newBuildMetadata: CharacterBuildMetadata
  }) => {
    if (userId == null) throw new Error("Not authenticated")
    await runCreate({
      id: args.newId,
      pageTypeSlug: CHARACTER_BUILD_PAGE_TYPE_SLUG,
      properties: {
        userId,
        accountPage: userId,
        buildHash: args.newBuildHash,
        buildMetadata: buildMetadataToJson(args.newBuildMetadata),
        visibility: "private",
        correlationId: args.newId,
      },
    })
  }

  const importFromHash = async (args: {
    id: string
    buildHash: string
    buildMetadata: CharacterBuildMetadata
    esoCharacterId?: string
    entityId?: string
    liveBuildId?: string
    targetBuildId?: string
    newTargetId?: string
  }) => {
    if (userId == null) throw new Error("Not authenticated")
    const created = await runCreate({
      pageTypeSlug: CHARACTER_BUILD_PAGE_TYPE_SLUG,
      properties: {
        userId,
        accountPage: userId,
        buildHash: args.buildHash,
        buildMetadata: buildMetadataToJson(args.buildMetadata),
        visibility: "live",
        correlationId: args.id,
      },
    })
    const newBuildId = typeof created.id === "string" ? created.id : args.id
    if (args.esoCharacterId != null) {
      await runPatch({
        pageTypeSlug: "temper-account-character",
        where: [
          { key: "accountPage", eq: userId },
          { key: "esoCharacterId", eq: args.esoCharacterId },
        ],
        set: { liveBuildId: newBuildId },
      })
    }
  }

  const createTargetBuild = async (args: {
    entityId: string
    newBuildId: string
    buildHash: string
    buildMetadata: CharacterBuildMetadata
  }) => {
    if (userId == null) throw new Error("Not authenticated")
    await runCreate({
      pageTypeSlug: CHARACTER_BUILD_PAGE_TYPE_SLUG,
      properties: {
        userId,
        accountPage: userId,
        buildHash: args.buildHash,
        buildMetadata: buildMetadataToJson(args.buildMetadata),
        visibility: "target",
        correlationId: args.newBuildId,
      },
    })
  }

  const setTarget = async (args: {
    entityId: string
    esoCharacterId: string
    newBuildId?: string
    buildHash: string
    buildMetadata: CharacterBuildMetadata
    updateExistingTargetId?: string
  }) => {
    if (userId == null) throw new Error("Not authenticated")
    let targetBuildId = args.updateExistingTargetId ?? args.newBuildId
    if (args.updateExistingTargetId != null) {
      await runPatch({
        pageTypeSlug: CHARACTER_BUILD_PAGE_TYPE_SLUG,
        where: [{ key: "id", eq: args.updateExistingTargetId }],
        set: {
          buildHash: args.buildHash,
          buildMetadata: buildMetadataToJson(args.buildMetadata),
        },
      })
    } else if (args.newBuildId != null) {
      const created = await runCreate({
        pageTypeSlug: CHARACTER_BUILD_PAGE_TYPE_SLUG,
        properties: {
          userId,
          accountPage: userId,
          buildHash: args.buildHash,
          buildMetadata: buildMetadataToJson(args.buildMetadata),
          visibility: "target",
          correlationId: args.newBuildId,
        },
      })
      targetBuildId = typeof created.id === "string" ? created.id : args.newBuildId
    }
    if (targetBuildId != null) {
      await runPatch({
        pageTypeSlug: "temper-account-character",
        where: [
          { key: "accountPage", eq: userId },
          { key: "esoCharacterId", eq: args.esoCharacterId },
        ],
        set: { targetBuildId },
      })
    }
  }

  return {
    createNew,
    remix,
    importFromHash,
    createTargetBuild,
    setTarget,
  }
}

export function useAllCharacterList(userId: string | null) {
  const userRead = usePagesSupabase({
    pageTypeSlug: CHARACTER_BUILD_PAGE_TYPE_SLUG,
    where:
      userId != null ? [{ key: "userId", eq: userId }] : [{ key: "userId", eq: NEVER_MATCH_VALUE }],
    order: [{ by: "updatedAt", dir: "desc" }],
    limit: 500,
  })
  const publicRead = usePagesSupabase({
    pageTypeSlug: CHARACTER_BUILD_PAGE_TYPE_SLUG,
    where: [{ key: "visibility", eq: "public" }],
    order: [{ by: "updatedAt", dir: "desc" }],
    limit: 500,
  })

  const isLoading = userRead.isLoading || publicRead.isLoading

  const userBuilds = userRead.rows.map(mapBuildRow)
  const publicBuilds = publicRead.rows.map(mapBuildRow)
  const userBuildIds = new Set(userBuilds.map((b) => b.id))
  const merged = [...userBuilds, ...publicBuilds.filter((b) => !userBuildIds.has(b.id))]
  return { builds: merged, isLoading }
}
