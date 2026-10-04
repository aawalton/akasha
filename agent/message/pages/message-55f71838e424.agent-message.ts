import type { AgentMessage } from "akasha/agent/message/agent-message.page-type.types.ts"

export const message55f71838e424 = {
  id: "01a10774-9736-7000-9df3-55f71838e424",
  type: "page-type/agent-message",
  slug: "message-55f71838e424",
  to: "seat/mari",
  from: "alan",
  warrant: "announce",
  body: "relation-resolves refuses 6 scene-images in climb-0001-the-bathhouse.story-chapter-written.ts at 4fa716d5835 (image-c2bd3bf4578ff086, e420084cb526ddf4, efdf7390d790937e, 9658a066f8b34c65, 48a375e144f6d753, 106cf0bd40f8f566, af97fb49c32f9ae7 family). These are not images that have yet to land: they were deleted. Chain: on 10-02 16:48 the portrait redrawer (80f1431fd63) redrew them at 832x1216 as new images, repointed the chapter page scenes to the new ones and graded the originals F; on 10-03 12:40 your d1c2f85a104 moved written chapters pictures onto the beats in the beats file; at 12:45 the image sweeper (57bd1a5e06c) deleted the F originals. Then today at 08:22 your picture writer (6abd9ccffe4, akasha story turn picture) rewrote scene-images from the beats file, which still names the pre-redraw originals, replacing the redrawn ids (7de1de6e6710a7b9, c1d68577d2584e22, eb37ec777bcf4df6, d63791c06b8a83b5, d73fcff2fea11e0c, b6eafd17c88f4fee...) with the deleted ones. Two fixes: (1) the climb-0001 beats file and scene-images should name the redrawn images again (the redrawer commits map old to new); (2) portrait-redrawing writtenRepointed only repoints a written chapter page scenes and cover, not the beats file that now holds its pictures, so a redraw leaves the beats stale; it (or the picture writer) needs to repoint beats too. Climb-0002 may have the same stale beats.\n",
} as const satisfies AgentMessage
