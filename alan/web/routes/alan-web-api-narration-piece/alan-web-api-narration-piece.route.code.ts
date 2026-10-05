import {
  narrationIdIs,
  narrationPassedThrough,
  pieceNameIs,
} from "akasha/story/chapter/narration/modules/telling/narration-telling.module.code.ts"

export async function loader({
  params,
  request,
}: {
  params: { id: string; name: string }
  request: Request
}): Promise<Response> {
  if (!narrationIdIs(params.id) || !pieceNameIs(params.name)) {
    return Response.json({ error: "no such narration piece" }, { status: 404 })
  }
  return narrationPassedThrough(params.id, params.name, request.signal)
}
