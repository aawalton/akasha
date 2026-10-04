import { afterEach, expect, test } from "bun:test"
import { runComfyGraph } from "akasha/infrastructure/inference/client/modules/comfy-client/comfy-client.module.code.ts"

const PROMPT_ID = "prompt-one"

type Heard = { readonly path: string; readonly body: unknown }

type Served = { readonly baseUrl: string; readonly heard: Heard[]; readonly stop: () => void }

let live: Served | undefined

afterEach(() => {
  live?.stop()
  live = undefined
})

function serving(history: unknown): Served {
  const heard: Heard[] = []
  const server = Bun.serve({
    port: 0,
    fetch: async (asked) => {
      const path = new URL(asked.url).pathname
      const body = asked.method === "POST" ? await asked.json() : undefined
      heard.push({ path, body })
      if (path === "/prompt") return Response.json({ prompt_id: PROMPT_ID })
      if (path === `/history/${PROMPT_ID}`) return Response.json(history)
      return Response.json({})
    },
  })
  live = { baseUrl: `http://127.0.0.1:${server.port}`, heard, stop: () => server.stop(true) }
  return live
}

test("a run given up on is taken off the queue and interrupted where it is running", async () => {
  const served = serving({})

  const ran = runComfyGraph({ baseUrl: served.baseUrl, buildGraph: () => ({}), pollDeadlineMs: 1 })

  await expect(ran).rejects.toThrow("did not complete")
  expect(served.heard).toContainEqual({ path: "/queue", body: { delete: [PROMPT_ID] } })
  expect(served.heard).toContainEqual({ path: "/interrupt", body: { prompt_id: PROMPT_ID } })
})

test("a run answered with its image is left as ComfyUI has it", async () => {
  const image = { filename: "edit_00001_.png", subfolder: "", type: "output" }
  const served = serving({ [PROMPT_ID]: { outputs: { "9": { images: [image] } } } })

  const ran = await runComfyGraph({
    baseUrl: served.baseUrl,
    buildGraph: () => ({}),
    pollDeadlineMs: 60_000,
  })

  expect(ran.image).toEqual(image)
  expect(served.heard.map((one) => one.path)).not.toContain("/queue")
  expect(served.heard.map((one) => one.path)).not.toContain("/interrupt")
})
