import type {
  MbArtistSearchHit,
  MbRecording,
  MbWork,
} from "akasha/alan/music/catalog/modules/musicbrainz-schema/musicbrainz-schema.module.code.ts"

export type MbRelation = MbWork["relations"][number]

export const QUEEN = "mbid-queen"

export const BOWIE = "mbid-bowie"

export function hit(name: string, score: number, id = `mbid-${name}`): MbArtistSearchHit {
  return { id, name, score }
}

export function writerRel(artistId: string, type = "writer"): MbRelation {
  return { type, "target-type": "artist", artist: { id: artistId, name: artistId } }
}

export function versionRel(type: string, direction: string): MbRelation {
  return {
    type,
    direction,
    "target-type": "work",
    work: { id: "mbid-other-work", title: "Other Work" },
  }
}

export function work(id: string, title: string, relations: MbRelation[] = []): MbWork {
  return { id, title, relations }
}

export function recording(
  id: string,
  title: string | null,
  relations: MbRelation[] = []
): MbRecording {
  return { id, title, relations }
}
