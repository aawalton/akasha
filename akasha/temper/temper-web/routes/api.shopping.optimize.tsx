import { optimizeShopping } from "@akasha/temper-shopping/ttc-shopping-optimizer"
import type { ShoppingItem } from "@akasha/temper-shopping/ttc-shopping-types"
import { TTC_AGO } from "@akasha/temper-trading-pricing/ttc-listing-types"
import { createTTCListingClient } from "@akasha/temper-trading-pricing-client/ttc-listing-client"
import type { Route } from "./+types/api.shopping.optimize"

const ttcClient = createTTCListingClient()

const SSE_HEADERS = {
  "Content-Type": "text/event-stream",
  "Cache-Control": "no-cache",
  Connection: "keep-alive",
} as const

function sseEvent(event: string, data: unknown): string {
  return `event: ${event}\ndata: ${JSON.stringify(data)}\n\n`
}

export async function action({ request }: Route.ActionArgs): Promise<Response> {
  let parsed: unknown
  try {
    parsed = await request.json()
  } catch {
    return new Response(JSON.stringify({ error: "Invalid JSON body" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    })
  }

  if (!Array.isArray(parsed) || parsed.length === 0) {
    return new Response(JSON.stringify({ error: "No items to search" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    })
  }
  const items: ShoppingItem[] = parsed

  const stream = new ReadableStream({
    async start(controller) {
      const encoder = new TextEncoder()

      const send = (event: string, data: unknown) => {
        controller.enqueue(encoder.encode(sseEvent(event, data)))
      }

      try {
        const plan = await optimizeShopping(ttcClient, items, {
          ago: TTC_AGO.Hours6,
          maxPagesPerItem: 3,
          onSearchProgress: (completed, total) => {
            send("progress", { completed, total })
          },
        })
        send("complete", { plan })
      } catch (err) {
        const message = err instanceof Error ? err.message : "Unknown error"
        send("error", { error: message })
      } finally {
        controller.close()
      }
    },
  })

  return new Response(stream, { headers: SSE_HEADERS })
}
