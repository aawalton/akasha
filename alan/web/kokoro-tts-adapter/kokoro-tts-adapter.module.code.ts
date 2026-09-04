import type { NativeTtsAdapter, NativeTtsEvent } from "@akasha/pages-ui/media/native-tts-adapter"
import { buildKokoroSpeechInput } from "@akasha/voice-core/voice/speech"
import { z } from "zod"
import {
  getKokoroTts,
  type PluginListenerHandle,
} from "../capacitor-bridge/capacitor-bridge.module.code.ts"

const ProgressPayloadSchema = z
  .object({ positionFraction: z.number(), playedSeconds: z.number() })
  .strict()
const ErrorPayloadSchema = z.object({ message: z.string() }).strict()
const DownloadProgressPayloadSchema = z.object({ received: z.number(), total: z.number() }).strict()

export function buildNativeTtsAdapter(): NativeTtsAdapter | null {
  const plugin = getKokoroTts()
  if (plugin == null) return null

  return {
    prepare: async () => {
      await plugin.prepare()
    },

    startChapter: async ({ chapterId, text, startFraction, rate }) => {
      const flat = buildKokoroSpeechInput(text)
      await plugin.startChapter({ chapterId, text: flat, startFraction })
      if (rate != null) await plugin.setRate({ rate })
    },

    pause: async () => {
      await plugin.pause()
    },

    resume: async () => {
      await plugin.resume()
    },

    stop: async () => {
      await plugin.stop()
    },

    seek: async (fraction) => {
      await plugin.seek({ fraction })
    },

    setRate: async (rate) => {
      await plugin.setRate({ rate })
    },

    subscribe: (listener) => {
      let cancelled = false
      const handles: PluginListenerHandle[] = []

      const track = (handle: PluginListenerHandle): undefined => {
        if (cancelled) {
          void handle.remove()
          return
        }
        handles.push(handle)
      }

      const emit = (event: NativeTtsEvent): undefined => {
        if (cancelled) return
        listener(event)
      }

      const register = async (
        attach: () => Promise<PluginListenerHandle> | PluginListenerHandle
      ): Promise<void> => {
        const handle = await Promise.resolve(attach())
        track(handle)
      }

      void register(() =>
        plugin.addListener("progress", (payload) => {
          const parsed = ProgressPayloadSchema.safeParse(payload)
          if (!parsed.success) return
          emit({
            type: "progress",
            positionFraction: parsed.data.positionFraction,
            playedSeconds: parsed.data.playedSeconds,
          })
        })
      )
      void register(() =>
        plugin.addListener("waiting", () => {
          emit({ type: "waiting" })
        })
      )
      void register(() =>
        plugin.addListener("playing", () => {
          emit({ type: "playing" })
        })
      )
      void register(() =>
        plugin.addListener("ended", () => {
          emit({ type: "ended" })
        })
      )
      void register(() =>
        plugin.addListener("error", (payload) => {
          const parsed = ErrorPayloadSchema.safeParse(payload)
          if (!parsed.success) return
          emit({ type: "error", message: parsed.data.message })
        })
      )
      void register(() =>
        plugin.addListener("downloadProgress", (payload) => {
          const parsed = DownloadProgressPayloadSchema.safeParse(payload)
          if (!parsed.success) return
          emit({
            type: "downloadProgress",
            received: parsed.data.received,
            total: parsed.data.total,
          })
        })
      )

      return () => {
        cancelled = true
        for (const handle of handles.splice(0)) void handle.remove()
      }
    },
  }
}
