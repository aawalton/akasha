import { z } from "zod"

export const caldataEventSchema = z
  .object({
    id: z.string(),
    title: z.string(),
    sub_title: z.string().nullish(),
    description: z.string().nullish(),
    long_description: z.string().nullish(),
    raw_start_time: z.string(),
    raw_end_time: z.string().nullish(),
    time_string: z.string().nullish(),
    location: z.string().nullish(),
    venues: z.string().nullish(),
    image: z.string().nullish(),
    url: z.string().nullish(),
    allow_reg: z.string().nullish(),
    reg_opens: z.string().nullish(),
    reg_url: z.string().nullish(),
    max_attendee: z.string().nullish(),
    agesArray: z.array(z.string()).nullish(),
    tagsArray: z.array(z.string()).nullish(),
    search_tagsArray: z.array(z.string()).nullish(),
  })
  .passthrough()

export type CaldataEvent = z.infer<typeof caldataEventSchema>

export const caldataResponseSchema = z.array(caldataEventSchema)
