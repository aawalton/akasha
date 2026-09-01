import { stockfishAvailable } from "@akasha/chess-core/chess-engine"
import { evaluate } from "@akasha/chess-core/chess-position"
import { parseFen } from "@akasha/chess-core/chess-uci"
import { z } from "zod"

const requestSchema = z.object({ fen: z.string().min(1) })

const ANALYSIS_DEPTH = 12

export async function action({ request }: { request: Request }): Promise<Response> {
  let body: unknown
  try {
    body = await request.json()
  } catch {
    return Response.json({ engineAvailable: false }, { status: 400 })
  }
  const parsed = requestSchema.safeParse(body)
  if (!parsed.success) {
    return Response.json({ engineAvailable: false }, { status: 400 })
  }
  let fen: string
  try {
    fen = parseFen(parsed.data.fen)
  } catch {
    return Response.json({ engineAvailable: false }, { status: 400 })
  }
  if (!stockfishAvailable()) {
    return Response.json({ engineAvailable: false })
  }
  try {
    const result = await evaluate(fen, ANALYSIS_DEPTH)
    return Response.json({
      engineAvailable: true,
      scoreWhitePov: result.scoreWhitePov,
      scoreKind: result.scoreKind,
      bestMove: result.bestMove,
    })
  } catch {
    return Response.json({ engineAvailable: false })
  }
}
