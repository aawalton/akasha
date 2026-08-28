import { z } from 'zod';

export const SEAT_MODE_SCHEMA = z.enum(['interactive', 'headless']);
export type SeatMode = z.infer<typeof SEAT_MODE_SCHEMA>;
