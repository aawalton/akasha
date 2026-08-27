import { getPage } from "@shared/pages-access/get"
import { patchPage } from "@shared/pages-access/patch"
import { z } from "zod"

const AWEN_GAME_SLUG = "game"
const AWEN_TURN_SLUG = "game-turn"

const RelationIdsSchema = z
  .array(z.unknown())
  .catch([])
  .transform((arr) => arr.filter((v): v is string => typeof v === "string"))

export interface MarkTurnReadResult {
  readonly ok: boolean
  readonly status: number
}

export async function markTurnRead(args: {
  externalId: string
  turnId: string
  sessionUserId: string
}): Promise<MarkTurnReadResult> {
  const game = await getPage({
    pageTypeSlug: AWEN_GAME_SLUG,
    where: [{ key: "externalId", eq: args.externalId }],
    select: ["userId", "turns"],
  })
  if (game === null) return { ok: false, status: 404 }

  const ownerId = typeof game.userId === "string" ? game.userId : null
  if (ownerId === null || ownerId !== args.sessionUserId) return { ok: false, status: 403 }

  const turnIds = RelationIdsSchema.parse(game.turns ?? [])
  if (!turnIds.includes(args.turnId)) return { ok: false, status: 403 }

  const turn = await getPage({
    pageTypeSlug: AWEN_TURN_SLUG,
    where: [{ key: "id", eq: args.turnId }],
    select: ["length", "completedAt"],
  })
  if (turn === null) return { ok: false, status: 404 }

  const length = typeof turn.length === "number" ? turn.length : 0
  if (length <= 0) return { ok: true, status: 200 }
  if (turn.completedAt != null) return { ok: true, status: 200 }

  await patchPage({
    pageTypeSlug: AWEN_TURN_SLUG,
    where: [{ key: "id", eq: args.turnId }],
    set: { completedAt: new Date().toISOString(), progress: length },
  })
  return { ok: true, status: 200 }
}
