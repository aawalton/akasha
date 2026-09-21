declare var TemperCombat_Save:
  | {
      Default?: Record<
        string,
        | Record<
            string,
            { version?: number; Settings?: Record<string, unknown> } & Record<string, unknown>
          >
        | undefined
      >
    }
  | undefined
