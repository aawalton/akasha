interface LibPriceApi {
  ItemLinkToPriceGold: (
    itemLink: string,
    ...sources: string[]
  ) => LuaMultiReturn<
    [gold: number | undefined, source: string | undefined, freshness: string | undefined]
  >
}

declare const LibPrice: LibPriceApi
