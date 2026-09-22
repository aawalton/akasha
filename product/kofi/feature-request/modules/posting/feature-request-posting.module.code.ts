import type { Landed } from "akasha/product/kofi/feature-request/modules/writing/feature-request-writing.module.code.ts"

const WENT_NOWHERE = "the post went nowhere, so nothing moved"

async function refusalIn(answer: Response): Promise<string> {
  try {
    const said = (await answer.json()) as { readonly error?: unknown }
    return typeof said.error === "string" ? said.error : WENT_NOWHERE
  } catch {
    return WENT_NOWHERE
  }
}

export async function postedTo(path: string, body: unknown): Promise<Landed> {
  let answer: Response
  try {
    answer = await fetch(path, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(body),
    })
  } catch {
    return { refused: WENT_NOWHERE }
  }
  if (!answer.ok) return { refused: await refusalIn(answer) }
  try {
    const said = (await answer.json()) as { readonly slug?: unknown }
    return { slug: typeof said.slug === "string" ? said.slug : "" }
  } catch {
    return { refused: WENT_NOWHERE }
  }
}
