interface LibEmoteEmote {
  textures: string[]
}

interface LibEmoteLibrary {
  GetEmoteByIndex: (this: void, index: number) => LibEmoteEmote
}

declare const LibEmote: LibEmoteLibrary | undefined
