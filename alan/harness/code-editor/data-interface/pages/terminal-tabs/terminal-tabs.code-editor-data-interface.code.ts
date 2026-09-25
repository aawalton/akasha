import { z } from "zod"

export const terminalTabsStateSchema = z.object({
  seatByShellPid: z.record(z.string(), z.string()),
  colorBySeat: z.record(z.string(), z.string()),
})

export type TerminalTabsState = z.infer<typeof terminalTabsStateSchema>
